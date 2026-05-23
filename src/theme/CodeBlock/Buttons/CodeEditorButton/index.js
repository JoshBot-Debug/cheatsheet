import React, { useCallback, useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { translate } from "@docusaurus/Translate";
import { useCodeBlockContext } from "@docusaurus/theme-common/internal";
import Button from "@theme/CodeBlock/Buttons/Button";
import IconCopy from "@theme/Icon/Copy";
import IconSuccess from "@theme/Icon/Success";
import IconClose from "@theme/Icon/Close";
import styles from "./styles.module.css";
import CodeEditor from "@site/src/components/CodeEditor";

function title() {
  return translate({
    id: "theme.CodeBlock.editor",
    message: "Editor",
    description: "Open a code editor",
  });
}

async function copyToClipboard(text) {
  // The clipboard API is only defined in secure contexts (HTTPS / localhost).
  // See https://developer.mozilla.org/en-US/docs/Web/API/Clipboard
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  // Fall back to copy-text-to-clipboard for non-secure contexts (e.g. HTTP
  // on a local network). The fallback is lazily loaded to avoid bundle
  // overhead for the common HTTPS case.
  const { default: copy } = await import("copy-text-to-clipboard");
  return copy(text);
}
function useCopyButton() {
  const {
    metadata: { code },
  } = useCodeBlockContext();
  const copyCode = () => copyToClipboard(code);
  return { copyCode };
}

const EditorIcon = () => (
  <svg
    viewBox="0 0 28 24"
    width="18"
    height="18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 18 26 12 20 6" />
    <line x1="16" y1="4" x2="12" y2="20" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

function useModal(Component) {
  const dialogRef = useRef(null);

  const openModal = (content) => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeModal = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const Modal = () => (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      style={{
        border: "none",
        backgroundColor: "transparent",
        borderRadius: "8px",
        padding: "8px",
        width: "90%",
      }}
    >
      <Button
        aria-label="code-editor-close"
        style={{ marginLeft: "auto", marginBottom: "16px" }}
        onClick={closeModal}
      >
        <IconClose />
      </Button>
      <Component />
    </dialog>
  );

  return { openModal, closeModal, Modal };
}

export default function CopyButton({ className }) {
  const { copyCode } = useCopyButton();
  const { openModal, Modal } = useModal(CodeEditor);

  function onOpen(e) {
    copyCode(e).then(openModal);
  }

  return (
    <>
      <Button
        aria-label="code-editor"
        title={title()}
        className={clsx(className, styles.copyButton)}
        onClick={onOpen}
      >
        <span className={styles.copyButtonIcons} aria-hidden="true">
          <EditorIcon className={styles.copyButtonIcon} />
        </span>
      </Button>
      <Modal />
    </>
  );
}
