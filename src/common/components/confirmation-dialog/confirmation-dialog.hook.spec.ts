import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('common/component/confirmation-dialog.hook', () => {
  it('should return emptyLookup ', () => {
    // Arrange
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    const emptyLookup = {
        id: '',
        name: '',
      };
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.itemToDelete).toEqual(emptyLookup);
  });

  it('Should be close when the user click onClose', () => {
    // Arrange
    const itemToDelete = {
      id: '1',
      name: 'Item to Delete',
    };
    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(itemToDelete);
    });
    // Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(itemToDelete);

    act(() => {
      result.current.onClose();
    });

    expect(result.current.isOpen).toEqual(false);
  });

  it('Should be equal to emptyLookup after delete itemToDelete', () => {
    // Arrange
    const itemToDelete = {
      id: '1',
      name: 'Item to delete',
    };
    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(itemToDelete);
    });
    // Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(itemToDelete);

    act(() => {
      result.current.onAccept();
    });

    const emptyLookup = {
        id: '',
        name: '',
      };
    expect(result.current.itemToDelete).toEqual(emptyLookup);
  });
});