import '@testing-library/jest-dom';

import { act, render } from '@testing-library/react';

import { Modal } from '.';

describe('Modal component', () => {
  it('should render correctly', () => {
    const wrapper = render(<Modal isOpen>Modal content</Modal>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should have the proper aria attributes', () => {
    const { getByRole, getByLabelText } = render(
      <Modal isOpen>Modal content</Modal>,
    );

    const modal = getByRole('dialog');
    const closeButton = getByLabelText('Close');

    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('role', 'dialog');
    expect(closeButton).toHaveAttribute('aria-label', 'Close');
  });

  it('should call onClose when clicking on the close button', () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(
      <Modal isOpen onClose={onClose}>
        Modal content
      </Modal>,
    );

    const closeButton = getByLabelText('Close');

    act(() => {
      closeButton.click();
    });

    expect(onClose).toHaveBeenCalled();
  });
});
