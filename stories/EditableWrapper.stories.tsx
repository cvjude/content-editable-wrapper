import React from 'react';
import { EditableWrapper } from '../src/components/EditableWrapper';

export default {
  title: 'Pages/EditableWrapper',
  component: EditableWrapper,
};

export const Default = {
  render: () => {
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
          data={{
            id: '4c722eab-31ab-406b-8e6b-7f5a76dadf89',
            resource: 'quik-influence',
            page: 'Home Page',
            type: 'footer',
            content: {
              sub_header: 'Connecting dots one lead at a time.',
              header: 'Ready to find your next audience with us?',
              header_desc:
                'No matter the size of the project, Quik Influence can create a custom service plan for you! And with access to leads in a seeminly limitless field of industries and niches, it’s no wonder we’re the go to for CRM needs.',
            },
          }}
        >
          <h1
            style={{
              padding: '10px',
            }}
          >
            Connecting dots one lead at a time.
          </h1>
        </EditableWrapper>
      </div>
    );
  },
};

export const Image = {
  render: () => {
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
          data={{
            id: '4c722eab-31ab-406b-8e6b-7f5a76dadf89',
            resource: 'quik-influence',
            page: 'Home Page',
            type: 'footer',
            content: {
              sub_header: 'Connecting dots one lead at a time.',
              header: 'Ready to find your next audience with us?',
              header_desc:
                'No matter the size of the project, Quik Influence can create a custom service plan for you! And with access to leads in a seeminly limitless field of industries and niches, it’s no wonder we’re the go to for CRM needs.',
            },
          }}
        >
          <img
            src="https://ucarecdn.com/6930354f-a355-4787-b586-edb494a224f2/"
            style={{
              width: '500px',
            }}
          ></img>
        </EditableWrapper>
      </div>
    );
  },
};
