import Modal from '../common/Modal';
import ContentsCreateForm from './ContentsCreateForm';

export default function ContentsCreateModal({ isOpen, onClose, onSaved }) {
  return (
    <Modal
      isOpen={isOpen}
      title="컨텐츠 생성"
      description="AI 쿼리와 차트·테이블·카드 설정을 조합하여 새로운 컨텐츠를 만듭니다."
      variant="form"
      onClose={() => onClose?.()}
    >
      <ContentsCreateForm
        onCancel={onClose}
        onSaved={(res) => {
          onSaved?.(res);
          onClose?.();
        }}
      />
    </Modal>
  );
}

