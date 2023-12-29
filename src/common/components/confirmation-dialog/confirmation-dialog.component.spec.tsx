import React from 'react';
import {render, screen} from '@testing-library/react';
import { ConfirmationDialogComponent, Props } from './confirmation-dialog.component';
import userEvent from '@testing-library/user-event';

describe('common/confirmationDialogComponent', () => {
    it('Should dialog be render and has a title', () => {
        // Arrange
        const props: Props = {
          isOpen: true,
          onAccept: jest.fn(),
          onClose: jest.fn(),
          title: "Confirmation Title",
          labels: {
            acceptButton: "Accept",
            closeButton:"Close"
          },
          children:""
        }
        // Act
          render(<ConfirmationDialogComponent {...props} />)
        // Assert
        const h2Element = screen.getByRole("heading", { level: 2 });
        expect(h2Element.textContent).toEqual('Confirmation Title');
    })

    it('Should dialog not be render in the screen where isOpen is false', () => {
      // Arrange
      const props: Props = {
        isOpen: false,
        onAccept: jest.fn(),
        onClose: jest.fn(),
        title: "Confirmation Title",
        labels: {
          acceptButton: "Accept",
          closeButton:"Close"
        },
        children:""
      }
      // Act
        render(<ConfirmationDialogComponent {...props} />)
      // Assert
      const h2Element = screen.queryAllByRole("heading", { level: 2 });
      expect(h2Element).toHaveLength(0);
  })

  it('Should call onAccept and onClose when user clicks accept', async () => {
    // Arrange
    const onAccept = jest.fn();
    const onClose = jest.fn();
    const props: Props = {
      isOpen: true,
      onAccept: onAccept,
      onClose: onClose,
      title: 'The Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: '',
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[1].textContent).toEqual(props.labels.acceptButton);
    await userEvent.click(buttons[1]);
    
    // Assert
    expect(onAccept).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('Should call onClose when user clicks close', async () => {
    // Arrange
    const onAccept = jest.fn();
    const onClose = jest.fn();
    const props: Props = {
      isOpen: true,
      onAccept: onAccept,
      onClose: onClose,
      title: 'The Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: '',
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].textContent).toEqual(props.labels.closeButton);
    await userEvent.click(buttons[0]);
    
    // Assert
    expect(onClose).toHaveBeenCalled();
  });
});