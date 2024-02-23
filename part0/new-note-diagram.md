```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: Form Data "content": "some text note"
    activate server
    server-->>browser: 302 redirect to https://studies.cs.helsinki.fi/exampleapp/notes
    Note right of browser: The browser reload page according to "Loading a page containing JavaScript - review" diagram with new note
    deactivate server
```