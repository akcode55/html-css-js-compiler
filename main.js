const htmlCodeEl = document.querySelector("[data-html]");
const cssCodeEl = document.querySelector("[data-css]");
const jsCodeEl = document.querySelector("[data-js]");
const codeEl = document.querySelector("[data-code]").contentWindow.document;
const runButtonEl = document.querySelector("#run");
const clearButtonEl = document.querySelector("#clear");

const defaultEditorSettings = {
  styleActiveLine: true,
  lineNumbers: true,
  matchBrackets: true,
  tabSize: 2,
  indentUnit: 2,
  theme: "monokai",
  lineWrapping: true,
};

// إعداد محرري HTML، CSS، وJavaScript باستخدام CodeMirror
const jsEditor = CodeMirror.fromTextArea(jsCodeEl, {
  ...defaultEditorSettings,
  mode: "javascript",
});

const cssEditor = CodeMirror.fromTextArea(cssCodeEl, {
  ...defaultEditorSettings,
  mode: "css",
});

const htmlEditor = CodeMirror.fromTextArea(htmlCodeEl, {
  ...defaultEditorSettings,
  mode: "xml",
  htmlMode: true,
});

// حفظ التعديلات عند الخروج من المحرر (blur)
for (const editor of [jsEditor, cssEditor, htmlEditor]) {
  editor.on("blur", (codeMirror) => {
    codeMirror.save();
  });
}

// تشغيل الكود عند النقر على زر RUN
runButtonEl.addEventListener("click", () => {
  const htmlCode = htmlEditor.getValue();
  const cssCode = cssEditor.getValue();
  const jsCode = jsEditor.getValue();

  codeEl.open();
  codeEl.write(`
    <style>
      ${cssCode}
      body {
        margin: 0;
        padding: 10px;
        font-family: Arial, sans-serif;
        color: orange; /* لون النص الأبيض */
        background-color: #1a1a2e; /* خلفية داكنة */
      }
    </style>
    ${htmlCode}
    <script>${jsCode}<\/script>
  `);
  codeEl.close();
});

// مسح المحررات عند النقر على زر CLEAR
clearButtonEl.addEventListener("click", () => {
  htmlEditor.setValue("");
  cssEditor.setValue("");
  jsEditor.setValue("");
});
