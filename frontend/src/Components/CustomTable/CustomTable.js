import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';


const CustomTable = ({ columns, data, onDelete, onDetail, onAdd, showDelete, showDetail, showAdd }) => {

    return (
        <TableContainer component={Paper} sx={{
            borderRadius: 0, marginTop: "20px"
        }}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                sx={{
                                    backgroundColor: '#1976D2',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                        {(showDelete || showDetail || showAdd) && <TableCell
                            sx={{
                                backgroundColor: '#1976D2',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            Action
                        </TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    {row[column.id]}
                                </TableCell>
                            ))}
                            {(showDelete || showDetail || showAdd) && <TableCell sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                {showAdd && (
                                    <Tooltip title="Add to WatchList">
                                        <IconButton
                                            size="small"
                                            sx={{ color: '#E87A2A', size: "10px", width: "40px" }}
                                            onClick={() => {
                                                onAdd(row);

                                            }}
                                        >
                                            <BookmarkAddIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {showDelete && (
                                    <Tooltip title="Delete this stock">
                                        <IconButton
                                            size="small"
                                            sx={{ color: '#E87A2A', width: "40px" }}
                                            onClick={() => onDelete(row)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {showDetail && (
                                    <Tooltip title="Show stock details"><IconButton
                                        size="small"
                                        sx={{ color: '#E87A2A', size: "10px", width: "40px" }}
                                        onClick={() => {
                                            onDetail(row);

                                        }}
                                    >
                                        <ZoomInIcon fontSize="small" />
                                    </IconButton>
                                    </Tooltip>
                                )}

                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
};

export default CustomTable;
