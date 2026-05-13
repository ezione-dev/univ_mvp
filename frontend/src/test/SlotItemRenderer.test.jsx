import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SlotItemRenderer from '../components/SlotItemRenderer';

// Mock the API service
vi.mock('../services/adminApi', () => ({
  getItemRender: vi.fn(),
}));

import { getItemRender } from '../services/adminApi';

describe('SlotItemRenderer', () => {
  it('renders error UI when success is false and error_msg exists', async () => {
    getItemRender.mockResolvedValue({
      success: false,
      error_msg: 'SQL syntax error at line 3',
      type: null,
    });

    render(<SlotItemRenderer itemId={1} baseYear={2025} isAdmin />);

    const errorMessage = await screen.findByText('SQL syntax error at line 3');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders year-related message when data is empty and has_base_year_placeholder is true', async () => {
    getItemRender.mockResolvedValue({
      success: true,
      has_base_year_placeholder: true,
      type: 'grid',
      columns: [],
      rows: [],
    });

    render(<SlotItemRenderer itemId={1} baseYear={2025} />);

    const yearMessage = await screen.findByText(/선택하신 2025년에 표시할 데이터가 없습니다./);
    expect(yearMessage).toBeInTheDocument();
    const subMessage = await screen.findByText(/다른 연도를 선택해 주세요./);
    expect(subMessage).toBeInTheDocument();
  });

  it('renders neutral message when data is empty and has_base_year_placeholder is false', async () => {
    getItemRender.mockResolvedValue({
      success: true,
      has_base_year_placeholder: false,
      type: 'grid',
      columns: [],
      rows: [],
    });

    render(<SlotItemRenderer itemId={1} baseYear={2025} />);

    const neutralMessage = await screen.findByText('조회 결과가 비어 있습니다.');
    expect(neutralMessage).toBeInTheDocument();
  });

  it('renders neutral message when type is null and has_base_year_placeholder is false', async () => {
    getItemRender.mockResolvedValue({
      success: true,
      has_base_year_placeholder: false,
      type: null,
    });

    render(<SlotItemRenderer itemId={1} />);

    const neutralMessage = await screen.findByText('조회 결과가 비어 있습니다.');
    expect(neutralMessage).toBeInTheDocument();
  });
});
