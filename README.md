# Welcome to content-editable-wrapper 👋

![Version](https://img.shields.io/badge/node->14.0.0-blue.svg?cacheSeconds=2592000) ![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg) ![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)

> This is project was built to be an editable wrapper for all homepages in ASD. It takes care of sending the data for that section to the API, and can also encapsulate an image.

### 🏠 [Homepage](https://github.com/cvjude/content-editable-wrapper/tree/main)

## Prerequisites

- Node >= 14.0.0
- React >= 16.0.0

## Install

```
npm install --save-dev content-editable-wrapper
```

## Usage

```sh
import { EditableWrapper } from 'content-editable-wrapper'
import { useState, useEffect } from 'react'
import { getPageData } from 'dispatchable-actions'

const Homepage = () => {
  const [pageData, setPageData] = useState()

  useEffect(() => {
    if(!pageData) return
    const data = getPageData()
    setPageData(data);
  }, [pageData])

  const handleFinishEditing = async (id, newContent) => {
    await axios.post(`my-uri/${id}`, newContent)
  }

  return (
    <>
      {pageData &&
        (<div>
          <EditableWrapper
            data={pageData}
            sectionId="header"
            sectionName="banner_header"
            handleFinishEditing={handleFinishEditing}
           >
            <h1>
              {pageData.content.header}
            </h1>
          </EditableWrapper>

          <EditableWrapper
            data={pageData}
            sectionId="image"
            sectionName="banner_header"
            isImage
            padding="20px"
            handleFinishEditing={handleFinishEditing}
           >
            <img src={pageData.content.image}
            style={{
                width: "200px"
            }}>
          </EditableWrapper>
        </div>
        )}
    </>
  )
}

--- dispatchable-actions.js ---
export const getPageData = () =>  {
    content: {
        header: "This is the end",
        image: "url"
    },
    id: 'data-id'
}

```

## Author

👤 **Chinoso Jude**

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Create a pull request and it will be reviewed and merged

## Show your support

Give a ⭐️ if this project helped you!
