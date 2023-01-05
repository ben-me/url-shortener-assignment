import { useEffect, useMemo, useState } from "react";
import NavigationBar from "./components/NavBar";
import React from "react";
import { useTable } from "react-table";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDialog from "./components/EditDialog";
import { Edit } from "@mui/icons-material";

export default function Admin() {
  const [urlList, setUrlList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

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

  const urlData = useMemo(
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
          ttlInSeconds: url.ttlInSeconds ? url.ttlInSeconds : "",
        };
      }),

    [urlList]
  );
  const tableInstance = useTable({ columns, data: urlData }, tableHook);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  function handleClickOpen() {
    setDialogOpen(true);
  }

  function tableHook(hook) {
    hook.visibleColumns.push((columns) => [
      {
        id: "Edit/Remove",
        Header: "Bearbeiten/Löschen",
        Cell: ({ row }) => (
          <>
            <IconButton
              onClick={() => {
                setSelectedRow(row.values);
                setDialogOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(row)}>
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
      ...columns,
    ]);
  }

  async function handleDelete(row) {
    try {
      await fetch(`https://urlshortener.smef.io/urls/${row.values.id}`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    }
  }

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
      {selectedRow ? (
        <EditDialog
          row={selectedRow}
          isOpen={dialogOpen}
          onSetDialogOpen={setDialogOpen}
        />
      ) : (
        ""
      )}
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
