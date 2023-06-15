import React from 'react';
import { ASDMedia } from '@alliance-software-development/asd-media-react';
import { Close } from '../../assets/close';
import { Checkmark } from '../../assets/checkmark';
import loader from '../../assets/loader.gif';
import '../../wrapper.css';

export const EditableWrapper = (props) => {
  const {
    children,
    sectionId,
    data,
    sectionName,
    isImage = false,
    isValidated = false,
    uploadCareKey,
    handleFinishEditing,
    className,
  } = props;
  const parent = React.useRef(null);

  const [editing, setEditing] = React.useState({ edit: false, close: false });
  const [loading, setLoading] = React.useState(false);
  const startEditing = () => {
    setEditing({ edit: true, close: true });
  };

  const finishEditing = async (imgurl) => {
    showLoader(true);

    // edit API call
    const element = document.querySelector(`#${sectionName}_${sectionId}`);

    let mutatedData = { ...data };

    let object = mutatedData;
    const stack = `content__${sectionId}`.split('__') || [];

    while (stack.length > 1) {
      object = object[stack.shift() || 0];
    }

    const lastObj = stack.shift();

    if (object[lastObj || 0] === element?.textContent && !isImage) {
      showLoader(false);
      return;
    }

    if (isImage) {
      object[lastObj || 0] = imgurl;
    } else {
      object[lastObj || 0] = element?.textContent;
    }

    if (!object[lastObj || 0]) {
      return;
    }

    try {
      if (handleFinishEditing) {
        await handleFinishEditing(data.id, {
          content: { ...data.content },
        });
      }
      if (isImage) {
        showLoader(false);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }

    showLoader(false);
  };

  const showLoader = (loading) => {
    if (loading) {
      setEditing({ edit: true, close: false });
      setLoading(true);
    } else {
      setEditing({ edit: false, close: false });
      setLoading(false);
    }
  };

  const onBlur = (e) => {
    const leavingParent = !parent?.current?.contains(e.relatedTarget);

    if (leavingParent && editing.edit) {
      finishEditing();
    }
  };

  if (!isValidated) return children;

  return (
    <div
      className={`asd-media-wrapper__editable_wrapper${
        className ? ` ${className}` : ''
      }`}
      onBlur={onBlur}
      tabIndex={-1}
      ref={parent}
    >
      <>
        <div
          className={`asd-media-wrapper__editable_wrapper__edit_button${
            editing.edit ? ' edit' : ''
          }`}
        >
          {editing.close && (
            <button onClick={finishEditing}>
              <Checkmark />
            </button>
          )}

          {/* <img
            src="/close.png"
            alt="Close"
            style={{ width: '10px', height: '10px' }}
          /> */}

          <button onClick={onBlur} className="close">
            <Close />
          </button>

          {loading && <img src={loader} alt="loader" width={30} height={30} />}
        </div>

        {isImage ? (
          <ImageSection
            sectionId={sectionId}
            sectionName={sectionName}
            children={children}
            showLoader={showLoader}
            finishEditing={finishEditing}
            uploadCareKey={uploadCareKey}
          />
        ) : (
          React.cloneElement(children, {
            ...children.props,
            contentEditable: editing.edit,
            onClick: startEditing,
            suppressContentEditableWarning: true,
            id: `${sectionName}_${sectionId}`,
          })
        )}
      </>
    </div>
  );
};

const ImageSection = ({
  sectionName,
  sectionId,
  children,
  showLoader,
  finishEditing,
  uploadCareKey,
}) => {
  const asdMediaRef = React.useRef();

  const translation = {
    buttons: {
      choose: {
        images: {
          one: '',
        },
      },
    },
  };

  const handleFileSelect = (file) => {
    showLoader(true);
  };

  const handleClick = () => {
    asdMediaRef.current?.openDialog();
  };

  const handleChange = (e) => {
    finishEditing(e.cdnUrl);
  };

  const handleDialogClose = () => {
    showLoader(false);
  };

  return (
    <>
      {React.cloneElement(children, {
        ...children.props,
        onClick: handleClick,
        id: `${sectionName}_${sectionId}`,
        tabIndex: -1,
      })}

      <ASDMedia
        // @ts-ignore
        ref={asdMediaRef}
        publicKey={uploadCareKey}
        onChange={handleChange}
        onDialogClose={handleDialogClose}
        localeTranslations={translation}
        imagesOnly
        previewStep
        onFileSelect={handleFileSelect}
        clearable
      />
    </>
  );
};

export default EditableWrapper;
