// AddLineButton.tsx
import React from 'react';
import './index.css'; // 引入样式文件

// 定义 AddLineButton 组件的属性接口
interface BattleStartProps {
  onClick: () => void; // 按钮点击时调用的函数
  label?: string;      // 按钮上显示的文本，可选
}

const BattleStart: React.FC<BattleStartProps> = ({
  onClick,
  label = 'Button Text', // 提供默认的按钮文本
}) => {
  return (
    <button className='battle-start-button'
      onClick={onClick} // 将父组件传递的 onClick 函数绑定到按钮
      style={{
        marginTop: '10px',
        padding: '8px 15px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        minWidth: '100px', // 确保按钮有最小宽度
        // alignSelf: 'flex-start', // 如果父元素是flex，让按钮靠左
      }}
    >
      {label}
    </button>
  );
};



export default BattleStart;