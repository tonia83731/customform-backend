## GET FORM QUESTIONS

- path: `/api/forms/:formId/get-form-questions`
- method: `GET`
- role: `all`

**Request:**

- body 不需要帶入任何參數
- 若表單包含 Section 則須包含 sectionId，API 如下: `/api/responses/:formId/questions?sectionId=`

**Response:**

### API Success

- 回傳 JSON **陣列**

```json
{
  "success": true,
  "data": [
      {
        "_id": "67ab164cb05cb4661a6f4d6e",
        "formId": "67aaf5e9a7627c12438341a0",
        "questionType":"shortAnswer",
        "options":[],
        "rowOptions":[],
        "colOptions":[],
        "allowedDateRange":false,
        "allowedTimeRange":false,
        "hasLimit":false,
        "wordLimit":null,
        "multiSelectLimit":false,
        "maxSelectLimit":null,
        "order": 1,
        "sectionId":"67ab0e7dbc959ed33cd44814",
        "createdAt":"1739265612514",
        "updatedAt":"1739282062609",
        "question":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut odio justo, pellentesque ac sodales sit amet, malesuada at urna. Ut.","isRequired":true
        },
        {
          "_id":"67ab58a1306881b8eadb3406",
          "formId":"67ab584d306881b8eadb33bd",
          "questionType":"multiChoice",
          "options":["Daily","Weekly","Monthly","Rarely"],
          "rowOptions":[],
          "colOptions":[],
          "allowedDateRange":false,
          "allowedTimeRange":false,
          "hasLimit":false,
          "wordLimit":null,
          "multiSelectLimit":false,
          "maxSelectLimit":null,
          "order":3,
          "sectionId":"67ab5854306881b8eadb33c4",
          "createdAt":"1739282593398",
          "updatedAt":"1739282667317",
          "question":"How often do you visit cafés? ",
          "isRequired":true
          }
      ...
    ]
}
```
