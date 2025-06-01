import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/Node.module.css";

export const TextNodeContent = ({ id, data, onDataChange }) => {
  const prevDataTextRef = useRef(data?.text);

  const [inputValue, setInputValue] = useState(() => {
    const initialVal = data?.text === undefined ? "{{initialVar}}" : data.text;
    console.log(
      `TextNode (${id}): INITIALIZING useState for inputValue. data.text="${data?.text}", initialVal="${initialVal}"`
    );
    return initialVal;
  });

  const textInputId = `${id}-text-input`;

  console.log(
    `TextNode (${id}): RENDERING. data.text_prop="${data?.text}", inputValue_state="${inputValue}", prevDataTextRef.current="${prevDataTextRef.current}"`
  );

  useEffect(() => {
    console.log(
      `TextNode (${id}): useEffect[data.text] FIRED. data.text_prop="${data?.text}", inputValue_state_before_set="${inputValue}", prevDataTextRef_before_set="${prevDataTextRef.current}"`
    );

    if (
      data?.text !== undefined &&
      data.text !== prevDataTextRef.current &&
      data.text !== inputValue
    ) {
      console.log(
        `TextNode (${id}): >>> PROP data.text ("${data.text}") is NEW and DIFFERENT from local inputValue ("${inputValue}"). Updating inputValue locally.`
      );
      setInputValue(data.text);
    } else {
      console.log(
        `TextNode (${id}): Prop data.text ("${
          data.text
        }") conditions not met for local update. (Prop changed? ${
          data.text !== prevDataTextRef.current
        }, Different from local? ${data.text !== inputValue})`
      );
    }

    prevDataTextRef.current = data?.text;
  }, [data?.text, inputValue, id]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    console.log(
      `TextNode (${id}): handleTextChange. User typed: "${newText}". Calling setInputValue and onDataChange.`
    );
    setInputValue(newText);
    onDataChange("text", newText);
  };

  return (
    <div className={styles.nodeInputGroup}>
      <label htmlFor={textInputId} className={styles.nodeLabel}>
        Text:
      </label>
      <textarea
        id={textInputId}
        value={inputValue}
        onChange={handleTextChange}
        className={`${styles.nodeTextarea} nodrag`}
        rows={3}
      />
    </div>
  );
};
