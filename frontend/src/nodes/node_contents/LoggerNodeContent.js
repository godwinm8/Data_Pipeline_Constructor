import React, { useEffect, useState, useRef } from "react";

export const LoggerNodeContent = ({ id, data }) => {
  const [loggedDataDisplay, setLoggedDataDisplay] = useState(null);
  const prevInputValueRef = useRef();
  const { inputValue } = data;
  useEffect(() => {
    if (inputValue !== prevInputValueRef.current) {
      if (inputValue !== undefined && inputValue !== null) {
        console.log(`Logger Node [${id}] InputValue Changed to:`, inputValue);

        setLoggedDataDisplay(JSON.stringify(inputValue, null, 2));
      } else {
      }
    }

    prevInputValueRef.current = inputValue;
  }, [id, inputValue]);

  return (
    <div>
      <p style={{ fontSize: "12px", margin: 0, color: "#FFFFFF" }}>
        Logs incoming data to the browser console.
      </p>
      <p style={{ fontSize: "10px", margin: "2px 0", color: "#FFFFFF" }}>
        (Check developer console for node data changes)
      </p>
      {loggedDataDisplay && (
        <pre
          style={{
            fontSize: "10px",
            maxHeight: "40px",
            overflowY: "auto",
            background: "#f9f9f9",
            border: "1px solid #eee",
            padding: "3px 5px",
            margin: "5px 0 0 0",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {loggedDataDisplay}
        </pre>
      )}
    </div>
  );
};
