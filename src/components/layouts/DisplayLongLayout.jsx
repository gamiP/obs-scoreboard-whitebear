import React from 'react';

const DisplayLongLayout = ({ dict, gameData }) => {
  const totalGames = gameData?.matchResults?.total ?? 0;
  const winRate = gameData?.matchResults?.winRate ?? 0;
  // 先攻率を計算する 試合数/先攻数
  const firstRate = totalGames === 0 ? 0 : Math.round((gameData?.turnResults?.first / totalGames) * 100);
  // 表率を計算する 試合数/表数
  const headsRate = totalGames === 0 ? 0 : Math.round((gameData?.coinResults?.heads / totalGames) * 100);

  const cellStyle = {
    border: '1px solid #000',
    textAlign: 'center',
    color: '#000',
    width: '25%',
    fontWeight: 'bold',
    fontFamily: '"Futura Bold", "Helvetica Black", "Arial Black", "Noto Sans JP Black", "ヒラギノ角ゴ StdN W8", sans-serif'
  };

  const headerCellStyle = {
    ...cellStyle,
    background: '#000',
    color: '#fff'
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
      <thead>
        <tr>
          <th style={headerCellStyle}>{dict.games}</th>
          <th style={headerCellStyle}>{dict.winRate}</th>
          <th style={headerCellStyle}>{dict.firstRate}</th>
          <th style={headerCellStyle}>{dict.coinHeadsRate}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={cellStyle}>{totalGames}</td>
          <td style={cellStyle}>{winRate}%</td>
          <td style={cellStyle}>{firstRate}%</td>
          <td style={cellStyle}>{headsRate}%</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DisplayLongLayout; 