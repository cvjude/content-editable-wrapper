import React from 'react';
import { EditableWrapper } from '../src/components/EditableWrapper';

export default {
  title: 'Pages/EditableWrapper',
  component: EditableWrapper,
};

export const Default = {
  render: () => {
    const data = {
      id: '4c722eab-31ab-406b-8e6b-7f5a76dadf89',
      resource: 'my-website',
      page: 'Home Page',
      type: 'banner',
      content: {
        sub_header: 'Connecting dots one lead at a time.',
      },
    };

    return (
      <div
        style={{
          width: '600px',
          marginTop: '30px',
        }}
      >
        <EditableWrapper
          isValidated
          sectionName="banner"
          sectionId="sub_header"
          data={data}
        >
          <h1
            style={{
              padding: '10px',
            }}
          >
            {data.content.sub_header}
          </h1>
        </EditableWrapper>
      </div>
    );
  },
};

export const Image = {
  render: () => {
    const data = {
      id: '4c722eab-31ab-406b-8e6b-7f5a76dadf89',
      resource: 'my-website',
      page: 'Home Page',
      type: 'banner',
      content: {
        img_url: 'Connecting dots one lead at a time.',
      },
    };

    return (
      <div
        style={{
          width: '600px',
          marginTop: '30px',
        }}
      >
        <EditableWrapper
          isValidated
          sectionName="test"
          sectionId="sub_header"
          isImage
          data={data}
        >
          <img
            src={data.content.img_url}
            style={{
              width: '500px',
            }}
          ></img>
        </EditableWrapper>
      </div>
    );
  },
};
