import React from 'react';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/components/ui/modal';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon, TrashIcon } from '@/components/ui/icon';
import { Box } from '@/components/ui/box';
import { Dimensions } from 'react-native';

export default function ModalClearAll({ isOpen, onClose, onConfirm }) {
  const { width, height } = Dimensions.get("window");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
      }} />
      <ModalContent className="items-center"
        style={{
          padding: 20,
          height: 210,
          maxWidth: width * 0.9,
          alignSelf: "center",
        }}>
        <ModalHeader style={{ marginBottom: 10 }}>
          <Box className="rounded-full bg-background-error items-center justify-center" style={{ padding: 10 }}>
            <Icon as={TrashIcon} className="stroke-error-600" size="xl" />
          </Box>
        </ModalHeader>
        <ModalBody style={{ marginBottom: 10 }}>
          <Heading size="md" className="text-typography-950 mb-2" style={{ textAlign: 'center' }}>
            Clear All Notifications
          </Heading>
          <Text size="sm" className="text-typography-500" style={{ textAlign: 'center' }}>
            Are you sure you want to clear all notifications?
            This action cannot be undone.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            size="sm"
            onPress={onClose}
            className="flex-grow"
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            size="sm"
            className="flex-grow"
            onPress={() => {
              onConfirm();
              onClose();
            }}
          >
            <ButtonText>Clear</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
