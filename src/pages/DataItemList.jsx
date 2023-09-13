import React, { useState, useEffect } from 'react';
import http from '../services/data.service';
import Table from 'react-bootstrap/Table';

const DataItemList = () => {
  const [dataItems, setDataItems] = useState([]);

  useEffect(() => {
    http.getAll()
      .then((response) => {
        setDataItems(response.data);
      })
      .catch((error) => {
        console.error('Veri alınırken hata:', error);
      });
  }, []);

  return (
    <Table striped="columns" bordered hover variant='dark'>
      <thead style={{color:'black'}}>
        <th>ALAN</th>
        <th>ÇEVRE</th>
        <th>DEĞER</th>
        <th>AÇIKLAMA</th>
        <th>SON GÜNCELLEME</th>
      </thead>
      {dataItems.map((item) => (
      <tbody>
        <tr>
          <td headers='ALAN'>{item.label}</td>
          <td headers='ÇEVRE'>{item.key}</td>
          <td headers='DEĞER'>{item.value}</td>
          <td headers='AÇIKLAMA'>{item.description}</td>
          <td headers='SON GÜNCELLEME'>{item.lastUpdate}</td>
        </tr>
      </tbody>))}
    </Table>
  );
}
export default DataItemList;
