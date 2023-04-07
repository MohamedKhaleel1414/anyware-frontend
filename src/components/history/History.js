import React, { useState, useEffect } from "react";
import { axiosInstance2 } from "../config/axiosSave";
import ReactPaginate from "react-paginate";
import './paginate.css'

function History() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    axiosInstance2.get("/retrieve").then((res) => {
      console.log(res.data);
      setHistory(res.data.reverse());
    });
  }, []);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(history.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(history.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, history]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % history.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <article className="container mt-5 pb-4">
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Number</th>
              <th scope="col">Country Prefix</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1 + itemOffset}</th>
                  <td>{item.number}</td>
                  <td>{item.country_prefix}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next »"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="« Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
}

export default History;
