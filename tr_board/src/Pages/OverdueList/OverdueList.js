import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { hot } from "react-hot-loader";
import { useTable, useRowSelect } from "react-table";
import {
  getOverdueList,
  returnUmb,
  getFilterOverdueList,
} from "../../Function";
import { ShowModal, StuNumFilterInput } from "../../Components";
import { noData } from "./OverdueList.module.css";

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
  let userData = [];
  const [selData, setSelData] = useState();

  const [funcState, setFuncState] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onButtonDeleteClick = () => {
    setSelData(userData);
    setFuncState("delete");
  };

  const setModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const doDeleteData = async () => {
    try {
      alert("삭제하시겠습니까?");
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
          {rows.length != 0 ? (
            rows.slice(0, 10).map((row, i) => {
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
            })
          ) : (
            <tr className={`${noData}`}>
              <td colSpan="5">연체 내역이 없습니다.</td>
            </tr>
          )}
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
          {
            ((userData = []),
            selectedFlatRows.map((d) => userData.push(d.original)))
          }
        </code>
      </pre>
      <button onClick={onButtonDeleteClick}>Delete</button>
      <button onClick={setModal}>Modal Test</button>
      <ShowModal setModal={setModal} isModalOpen={isModalOpen} />
    </>
  );
}

function OverdueList() {
  const [data, setData] = useState();
  const [stateData, setStateData] = useState(0);
  const [stuNum, setStuNum] = useState();

  const doSetStuNum = (value) => {
    setStuNum(value);
  };

  const doFilterOverdueList = async () => {
    try {
      if (stuNum === "" || stuNum === undefined) {
        doGetOverdueList();
      } else {
        const getFilterList = await getFilterOverdueList({ stuNum });
        setData(getFilterList);
        doSetStuNum();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const doSetStateData = () => {
    let chngStateData = stateData;

    setStateData(++chngStateData);
  };

  const doGetOverdueList = async () => {
    try {
      const getList = await getOverdueList();
      setData(getList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    doGetOverdueList();
  }, [stateData]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Student Info",
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
        Header: "Rental Info",
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
      <StuNumFilterInput
        doSetStuNum={doSetStuNum}
        stuNum={stuNum}
        doFilterApplyList={doFilterOverdueList}
      />
      {data !== undefined && (
        <Table columns={columns} data={data} doSetStateData={doSetStateData} />
      )}
    </Styles>
  );
}

export default hot(module)(OverdueList);
