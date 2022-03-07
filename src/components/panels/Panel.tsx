import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { Twemoji } from "@teuteuf/react-emoji-render";

interface PanelProps {
  title: string;
  isOpen: boolean;
  close: () => void;
  children?: React.ReactNode;
  debugAction?: () => void;
}

export function Panel({
  title,
  isOpen,
  close,
  children,
  debugAction,
}: PanelProps) {
  const [debug, setDebug] = useState(5);
  useEffect(() => {
    setDebug(5);
  }, [isOpen]);

  useEffect(() => {
    if (debug === 0 && debugAction != null) {
      debugAction();
    }
  }, [debug, debugAction]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      className="flex justify-center h-full"
      ariaHideApp={false}
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 dark:text-slate-100 text-sm overflow-auto px-2">
        <header className="border-b-2 border-gray-200 mb-3 flex">
          <h2
            className="text-2xl font-bold uppercase tracking-wide text-center my-1 flex-auto"
            onClick={() => setDebug((prev) => prev - 1)}
          >
            {title}
          </h2>
          <button type="button" onClick={close}>
            <Twemoji text="❌" />
          </button>
        </header>
        {children}
      </div>
    </Modal>
  );
}
