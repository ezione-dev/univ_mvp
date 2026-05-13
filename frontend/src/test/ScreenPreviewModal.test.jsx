import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ScreenPreviewModal from '../components/admin/ScreenPreviewModal';

vi.mock('../services/adminApi', () => ({
  getScreen: vi.fn(),
  getScreenSlots: vi.fn(),
  getTemplateSlots: vi.fn(),
  getItemRender: vi.fn(),
}));

import { getScreen, getScreenSlots, getTemplateSlots, getItemRender } from '../services/adminApi';

const CURRENT_YEAR = new Date().getFullYear();
const DEFAULT_YEAR = CURRENT_YEAR - 1;

const MOCK_SCREEN = { scr_id: 's1', scr_nm: '테스트 화면', template_id: 't1' };
const MOCK_TEMPLATE_SLOTS = [
  { slot_id: 'slot1', x_pos: 0, y_pos: 0, width: 6, height: 3 },
  { slot_id: 'slot2', x_pos: 6, y_pos: 0, width: 6, height: 3 },
];
const MOCK_ASSIGNED_SLOTS = [
  { slot_id: 'slot1', item_id: 101, item_nm: '아이템A' },
  { slot_id: 'slot2', item_id: 102, item_nm: '아이템B' },
];

function setupMocks() {
  getScreen.mockResolvedValue(MOCK_SCREEN);
  getTemplateSlots.mockResolvedValue(MOCK_TEMPLATE_SLOTS);
  getScreenSlots.mockResolvedValue(MOCK_ASSIGNED_SLOTS);
  getItemRender.mockResolvedValue({
    success: true,
    type: 'grid',
    columns: [{ key: 'name', label: '이름' }],
    rows: [{ name: '데이터' }],
  });
}

function renderModal(props = {}) {
  return render(
    <ScreenPreviewModal
      isOpen={true}
      onClose={vi.fn()}
      scrId="s1"
      {...props}
    />,
  );
}

describe('ScreenPreviewModal 통합 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupMocks();
  });

  it('모달 열면 기본 연도가 currentYear-1로 선택되어 있다', async () => {
    renderModal();

    await waitFor(() => {
      expect(screen.getByText(`${DEFAULT_YEAR}년`)).toBeInTheDocument();
    });

    const defaultBtn = screen.getByText(`${DEFAULT_YEAR}년`);
    expect(defaultBtn.className).toContain('bg-primary');
  });

  it('YearSelector 클릭 시 SlotItemRenderer가 새 연도로 API 재호출한다', async () => {
    renderModal();

    await waitFor(() => {
      expect(getItemRender).toHaveBeenCalledTimes(2);
    });
    expect(getItemRender).toHaveBeenCalledWith(101, { base_year: DEFAULT_YEAR });
    expect(getItemRender).toHaveBeenCalledWith(102, { base_year: DEFAULT_YEAR });

    vi.clearAllMocks();
    getItemRender.mockResolvedValue({
      success: true,
      type: 'grid',
      columns: [{ key: 'name', label: '이름' }],
      rows: [{ name: '새데이터' }],
    });

    fireEvent.click(screen.getByText(`${CURRENT_YEAR}년`));

    await waitFor(() => {
      expect(getItemRender).toHaveBeenCalledWith(101, { base_year: CURRENT_YEAR });
      expect(getItemRender).toHaveBeenCalledWith(102, { base_year: CURRENT_YEAR });
    });
  });

  it('모달 닫았다 다시 열면 baseYear가 리셋된다', async () => {
    const { rerender } = renderModal();

    await waitFor(() => {
      expect(screen.getByText(`${DEFAULT_YEAR}년`)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(`${CURRENT_YEAR}년`));
    await waitFor(() => {
      expect(screen.getByText(`${CURRENT_YEAR}년`).className).toContain('bg-primary');
    });

    rerender(
      <ScreenPreviewModal isOpen={false} onClose={vi.fn()} scrId="s1" />,
    );

    vi.clearAllMocks();
    setupMocks();

    rerender(
      <ScreenPreviewModal isOpen={true} onClose={vi.fn()} scrId="s1" />,
    );

    await waitFor(() => {
      const defaultBtn = screen.getByText(`${DEFAULT_YEAR}년`);
      expect(defaultBtn.className).toContain('bg-primary');
    });
  });

  it('base_year 플레이스홀더 없는 아이템도 동일하게 ctx 전달받는다', async () => {
    renderModal();

    await waitFor(() => {
      expect(getItemRender).toHaveBeenCalledWith(101, { base_year: DEFAULT_YEAR });
      expect(getItemRender).toHaveBeenCalledWith(102, { base_year: DEFAULT_YEAR });
    });
  });

  it('template_id 없는 화면은 슬롯이 비어도 YearSelector가 표시된다', async () => {
    getScreen.mockResolvedValue({ scr_id: 's2', scr_nm: '빈 화면', template_id: null });
    getTemplateSlots.mockResolvedValue([]);
    getScreenSlots.mockResolvedValue([]);

    renderModal({ scrId: 's2' });

    await waitFor(() => {
      expect(screen.getByText(`${DEFAULT_YEAR}년`)).toBeInTheDocument();
    });

    expect(getItemRender).not.toHaveBeenCalled();
  });

  it('API 에러 발생 시 에러 메시지가 표시되고 YearSelector는 나타나지 않는다', async () => {
    getScreen.mockRejectedValue(new Error('서버 오류'));

    renderModal();

    await waitFor(() => {
      expect(screen.getByText('서버 오류')).toBeInTheDocument();
    });

    expect(screen.queryByText(`${DEFAULT_YEAR}년`)).not.toBeInTheDocument();
  });

  it('item_id가 없는 슬롯은 SlotItemRenderer를 렌더하지 않는다', async () => {
    getScreen.mockResolvedValue(MOCK_SCREEN);
    getTemplateSlots.mockResolvedValue(MOCK_TEMPLATE_SLOTS);
    getScreenSlots.mockResolvedValue([
      { slot_id: 'slot1', item_id: 101, item_nm: '아이템A' },
      { slot_id: 'slot2', item_id: null, item_nm: null },
    ]);

    renderModal();

    await waitFor(() => {
      expect(getItemRender).toHaveBeenCalledTimes(1);
    });

    expect(getItemRender).toHaveBeenCalledWith(101, { base_year: DEFAULT_YEAR });
    expect(getItemRender).not.toHaveBeenCalledWith(null, expect.anything());
  });
});
