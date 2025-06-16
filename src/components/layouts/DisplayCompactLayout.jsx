import React from 'react';

const DisplayCompactLayout = ({ dict, gameData }) => {
  // 先攻・後攻の回数と勝利数（なければ0）
  const firstCount = gameData?.turnResults?.first ?? 0;
  const firstWins = gameData?.matchResults?.firstWins ?? 0;
  const secondCount = gameData?.turnResults?.second ?? 0;
  const secondWins = gameData?.matchResults?.secondWins ?? 0;

  const cellStyle = {
    border: '1px solid #000',
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontFamily: '"Futura Bold", "Helvetica Black", "Arial Black", "Noto Sans JP Black", "ヒラギノ角ゴ StdN W8", sans-serif'
  };

  const headerCellStyle = {
    ...cellStyle,
    background: '#fff',
    fontSize: '1.2em'
  };

  return (
    <table style={{
      border: '2px solid #000',
      borderCollapse: 'collapse',
      fontSize: '2.6em',
      width: '100%',
      background: '#fff',
      fontFamily: '"Futura Bold", "Helvetica Black", "Arial Black", "Noto Sans JP Black", "ヒラギノ角ゴ StdN W8", sans-serif'
    }}>
      <tbody>
        <tr>
          <th colSpan={2} style={headerCellStyle}>{dict.game}</th>
        </tr>
        <tr>
          <td style={cellStyle}>{dict.first}</td>
          <td style={cellStyle}>{firstCount}－{firstWins}</td>
        </tr>
        <tr>
          <td style={cellStyle}>{dict.second}</td>
          <td style={cellStyle}>{secondCount}－{secondWins}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DisplayCompactLayout; 