import React from 'react';
import DisplayStandardLayout from './DisplayStandardLayout';

const DisplayCompactLayout = (props) => (
  <>
    {/* CompactLayout: 標準レイアウトと同じ内容。将来的に変更可 */}
    <DisplayStandardLayout {...props} />
  </>
);

export default DisplayCompactLayout; 