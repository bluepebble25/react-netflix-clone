import React from "react";
import styled from 'styled-components';

const SkeletonRow = ({ large }) => {
  return (
    <Posters>
      {renderColumns(20, large)}
    </Posters>
  );
};

const SkeletonBanner = () => {

};

const renderColumns = (num, large) => {
  const col = [];
  for(let i = 0; i < num; i++) {
    if(large) {
      col.push(<Poster large />)
    } else {
      col.push(<Poster />)
    }
  }
  return col;
}

const Posters = styled.div`
  display: flex;
  width: 100%;
  overflow-x: hidden;
  padding: 20px 0;
`;

const Poster = styled.div`
  width: ${({ large }) =>
  large ?
  '12.5%' : '16.7%'
  };
  min-width: ${({ large }) =>
  large ?
  '240px' : '284.4px'
  };
  height: ${({ large }) =>
    large ?
    '320px' : '144px'
  };
  background-color: rgba(0, 0, 0, 0.8);
  margin-right: 10px;
  border-radius: 4px;
`;

export { SkeletonRow, SkeletonBanner };