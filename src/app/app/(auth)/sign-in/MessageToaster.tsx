'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

const MessageToaster = () => {
  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get('error');
    const error_description = new URLSearchParams(location.hash).get(
      'error_description',
    );
    const message = new URLSearchParams(window.location.search).get('message');

    if (error_description) {
      setTimeout(() => {
        toast.error(error_description);
      });
    }

    if (error) {
      setTimeout(() => {
        toast.error(error);
      });
    }

    if (message) {
      setTimeout(() => {
        toast.info(message);
      });
    }
  }, []);

  return null;
};

export default MessageToaster;
