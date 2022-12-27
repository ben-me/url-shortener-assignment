import { useEffect, useMemo, useState } from "react";
import NavigationBar from "./components/NavBar";
import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";

export default function Admin() {
  const [urlList, setUrlList] = useState([]);

  async function fetchUrlData() {
    try {
      const response = await fetch("https://urlshortener.smef.io/urls", {
        method: "GET",
        credentials: "include",
      });
      if (response) {
        const data = await response.json();
        setUrlList(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUrlData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Edit/Remove",
        accessor: "", // accessor is the "key" in the data
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Short URL",
        accessor: "shortUrl",
      },
      {
        Header: "Original URL",
        accessor: "originalUrl",
      },
      {
        Header: "Created",
        accessor: "createdDate",
      },
      {
        Header: "Lifetime",
        accessor: "ttlInSeconds",
      },
    ],

    []
  );

  const data = useMemo(
    () =>
      urlList.map((url) => {
        return {
          id: url.id,
          shortUrl: (
            <a
              href={`https://urlshortener.smef.io/${url.id}`}
            >{`https://urlshortener.smef.io/${url.id}`}</a>
          ),
          originalUrl: <a href={url.url}>{url.url}</a>,
          createdDate:
            url.createdDate.substring(0, 10) +
            " " +
            url.createdDate.substring(11, 19),
          ttlInSeconds: url.ttlInSeconds
            ? `${(url.ttlInSeconds / 60).toFixed(0)} Min`
            : "",
        };
      }),

    [urlList]
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <NavigationBar />
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <StyledTableHeader {...column.getHeaderProps()}>
                  {column.render("Header")}
                </StyledTableHeader>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <StyledTd {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </StyledTd>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </>
  );
}

const StyledTable = styled.table`
  margin: 5rem 2rem;
  table-layout: fixed;
  border-collapse: collapse;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  border: 1px solid;
`;

const StyledTableHeader = styled.th`
  padding: 1rem;
  text-align: justify;
  border: 1px solid;
`;

const StyledTd = styled.td`
  padding: 1rem;
  text-align: justify;
  border: 1px solid;
`;
