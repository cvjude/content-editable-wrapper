import React, { FC } from 'react';
import classNames from 'classnames';
import { Widget } from '@uploadcare/react-widget';
import { Close } from '../../assets/close';
import { Checkmark } from '../../assets/checkmark';
import loader from '../../assets/loader.gif';
import '../../wrapper.css';

interface EditableWrapperProps {
  children: any;
  sectionId: string;
  data: any;
  sectionName: string;
  isImage?: boolean;
  isValidated?: boolean;
  uploadCareKey?: string;
  handleFinishEditing?: (id: string, data: any) => void;
  className?: string;
}

export const EditableWrapper: FC<EditableWrapperProps> = (props) => {
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
  const parent = React.useRef<any>(null);

  const [editing, setEditing] = React.useState({ edit: false, close: false });
  const [loading, setLoading] = React.useState(false);
  const startEditing = () => {
    setEditing({ edit: true, close: true });
  };

  const finishEditing = async (imgurl?: string | any) => {
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

  const showLoader = (loading: boolean) => {
    if (loading) {
      setEditing({ edit: true, close: false });
      setLoading(true);
    } else {
      setEditing({ edit: false, close: false });
      setLoading(false);
    }
  };

  const onBlur = (e: any) => {
    const leavingParent = !parent?.current?.contains(e.relatedTarget);

    if (leavingParent && editing.edit) {
      finishEditing();
    }
  };

  if (!isValidated) return children;

  return (
    <div
      className={classNames('editable_wrapper', className)}
      onBlur={onBlur}
      tabIndex={-1}
      ref={parent}
    >
      <>
        <div
          className={classNames('editable_wrapper__edit_button', {
            edit: editing.edit,
          })}
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

interface ImageSectionProps {
  sectionName: string;
  sectionId: string;
  children: any;
  showLoader: (loading: boolean) => void;
  finishEditing: (imgurl?: string | any) => void;
  uploadCareKey?: string;
}

const ImageSection: FC<ImageSectionProps> = ({
  sectionName,
  sectionId,
  children,
  showLoader,
  finishEditing,
  uploadCareKey,
}) => {
  const mediaRef = React.useRef<any>();

  const translation = {
    buttons: {
      choose: {
        images: {
          one: '',
        },
      },
    },
  };

  const handleFileSelect = () => {
    showLoader(true);
  };

  const handleClick = () => {
    mediaRef.current?.openDialog();
  };

  const handleChange = (e: any) => {
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

      <Widget
        crop="free, 16:9, 4:3, 5:4, 1:1"
        publicKey={uploadCareKey as string}
        clearable
        ref={mediaRef}
        onFileSelect={handleFileSelect}
        onChange={handleChange}
        onDialogClose={handleDialogClose}
        localeTranslations={translation}
        imagesOnly
        previewStep
      />
    </>
  );
};

export default EditableWrapper;
