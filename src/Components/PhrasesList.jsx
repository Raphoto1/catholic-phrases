"use client";
//app
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender } from "@tanstack/react-table";
import React from "react";
import { Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, } from "@chakra-ui/react";
//own
// import frases from "../Data/frases";
export default function PhrasesList({frases}) {
  //column helper before all
  const columnHelper = createColumnHelper();
  //organize columns
  const columns = [
    columnHelper.accessor("id", {
      header: "id",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("frase", {
      header: "frase",
    }),
    columnHelper.accessor("autor", {
      header: "autor",
    }),
  ];
  //create table obj
  const table = useReactTable({
    data: frases,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-2/3 align-middle justify-center flex-1">
      <Table variant="striped" colorScheme="teal">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>{header.column.columnDef.header}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
