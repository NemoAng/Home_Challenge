import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

import './index.css'; // Assuming this CSS file exists and has styles for .log_div

// 定义暴露给父组件的句柄接口
// 注意：将 handleChange 也添加进来
export interface LogZoneHandle {
  addLogMessage: (message: string) => void;
  // **新增**：暴露 handleChange 函数
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  // 其他你可能想暴露的方法
  // scrollToBottom: () => void;
  // getLogContent: () => string;
}

const LogZone = forwardRef<LogZoneHandle, {}>((props, ref) => {
  const [text, setText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // **关键**：将 handleChange 也添加到 useImperativeHandle 的返回对象中
  useImperativeHandle(ref, () => ({
    addLogMessage: (message: string) => {
      setText(prevText => prevText + (prevText ? '\n' : '') + message);
    },
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
    },
  }));

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [text]);

  // handleChange 仍然在 LogZone 内部定义和使用，同时通过 useImperativeHandle 暴露出去
  const handleChangeInternal = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className='log_div'>
      <h3>Battle Log</h3>
      <textarea
        ref={textareaRef}
        value={text}
        // 注意：这里仍然绑定内部的 handleChangeInternal，
        // 父组件通过 ref 调用暴露的 handleChange 是另一种触发方式。
        // 如果父组件需要完全控制输入，那么 LogZone 就不能是受控组件。
        // 通常，如果父组件想“代替”子组件处理输入，那么子组件的 value 和 onChange 应该由父组件通过 props 传递。
        onChange={handleChangeInternal} // 子组件内部处理用户输入
        readOnly // 保持只读以作为日志区，除非你需要父组件来管理用户输入
        style={{
          width: '100%',
          height: "calc(100% - 2.5em - 20px)",
          resize: 'vertical',
          padding: '10px',
          border: '1px solid #007bff',
          borderRadius: '5px',
          boxSizing: 'border-box',
          fontFamily: 'monospace',
          overflowY: 'auto',
          display: 'block',
          minHeight: '200px',
          maxHeight: '400px',
        }}
      />
    </div>
  );
});

export default LogZone;