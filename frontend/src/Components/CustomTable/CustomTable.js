import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
// import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemoveAdd';

const CustomTable = ({ columns, data, onDelete, showDelete, showDetail, showAdd }) => {
    const navigate = useNavigate();
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
                                                console.log("add to list")
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
                                            navigate('/stocks');
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
