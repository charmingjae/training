import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { hot } from "react-hot-loader";
import { useTable, useRowSelect } from "react-table";
import { getRentList, returnUmb } from "../../Function";

const Styles = styled.div`
  padding: 1rem;

  table {
    margin-top: 5%;
    border-spacing: 0;
    border: 1px solid black;
    width: 100%;
    text-align: center;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

function Table({ columns, data: data, doSetStateData }) {
  let fruit = [];
  const [selData, setSelData] = useState();

  const [funcState, setFuncState] = useState();

  const onButtonClick = () => {
    setSelData(fruit);
    setFuncState("delete");
  };

  const doDeleteData = async () => {
    try {
      alert("삭제하시겠습니까?" + selData);
      const getResult = await returnUmb({ selData });
      if (getResult.result === "success") {
        doSetStateData();
        alert("삭제 완료");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (funcState === "delete") {
      doDeleteData();
    }
  }, [selData, funcState]);
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {/* {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map((d) =>
                useMemo(() => doSet(d.original), [])
              ),
            },
            null,
            2
          )} */}
          {/* {selectedFlatRows.map((d) => console.log(d.original))} */}
          {((fruit = []), selectedFlatRows.map((d) => fruit.push(d.original)))}
        </code>
      </pre>
      <button onClick={onButtonClick}>hello</button>
    </>
  );
}

function RentalList() {
  const [data, setData] = useState();
  const [stateData, setStateData] = useState(0);

  const doSetStateData = () => {
    let chngStateData = stateData;

    setStateData(++chngStateData);
  };

  const doGetRentList = async () => {
    try {
      const getList = await getRentList();
      setData(getList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    doGetRentList();
  }, [stateData]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "Name",
            accessor: "userName",
          },
          {
            Header: "Student Number",
            accessor: "studentNum",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Rent Date",
            accessor: "rentDate",
          },
          {
            Header: "Return Date",
            accessor: "returnDate",
          },
        ],
      },
    ],
    []
  );

  return (
    <Styles>
      {data !== undefined && (
        <Table columns={columns} data={data} doSetStateData={doSetStateData} />
      )}
    </Styles>
  );
}

export default hot(module)(RentalList);
