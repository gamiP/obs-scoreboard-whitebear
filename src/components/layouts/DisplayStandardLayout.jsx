import React from 'react';

const DisplayStandardLayout = ({ dict, gameData, currentTheme, showBackground, calcRate }) => (
  <table 
    className="display-table" 
    style={{ 
      color: currentTheme.color,
      backgroundColor: 'transparent'
    }}
  >
    <tbody>
      <tr>
        <th style={{writingMode: 'horizontal-tb', color: currentTheme.color}}>{dict.first}</th>
        <td style={{color: currentTheme.color}}>{gameData.turnResults.first}</td>
        <td style={{color: currentTheme.color}}>{calcRate(gameData.turnResults.first, gameData.matchResults.total)}%</td>
        <th style={{writingMode: 'horizontal-tb', color: currentTheme.color}}>{dict.win}</th>
        <td style={{color: currentTheme.color}}>{gameData.matchResults.wins}</td>
        <td style={{color: currentTheme.color}}>{calcRate(gameData.matchResults.wins, gameData.matchResults.total)}%</td>
      </tr>
      <tr>
        <th style={{writingMode: 'horizontal-tb', color: currentTheme.color}}>{dict.second}</th>
        <td style={{color: currentTheme.color}}>{gameData.turnResults.second}</td>
        <td style={{color: currentTheme.color}}>{calcRate(gameData.turnResults.second, gameData.matchResults.total)}%</td>
        <th style={{writingMode: 'horizontal-tb', color: currentTheme.color}}>{dict.lose}</th>
        <td style={{color: currentTheme.color}}>{gameData.matchResults.losses}</td>
        <td style={{color: currentTheme.color}}>{calcRate(gameData.matchResults.losses, gameData.matchResults.total)}%</td>
      </tr>
      <tr>
        <th colSpan={2} style={{writingMode: 'horizontal-tb', color: '#e83010', textAlign: 'center'}}>{dict.games}</th>
        <td colSpan={1} style={{color: currentTheme.color, textAlign: 'center'}}>{gameData.matchResults.total}</td>
        <th colSpan={2} style={{writingMode: 'horizontal-tb', color: '#e83010', textAlign: 'center'}}>{dict.winRate}</th>
        <td colSpan={1} style={{color: currentTheme.color, textAlign: 'center'}}>{gameData.matchResults.winRate}%</td>
      </tr>
    </tbody>
  </table>
);

export default DisplayStandardLayout; 