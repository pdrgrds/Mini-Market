import React from 'react';
import { ITable } from '../../Interface/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

export default function Table(props: ITable) {

    const { datasource, metadata } = props;

    return (
        <div className="table__default">
            <table>
                <thead>
                    <tr> 
                        {metadata.map((item) => <td key={item.key}> {item.label} </td>)} 
                        <td key={996}></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        datasource.map((item, index) =>
                            <>
                                <tr key={index}>
                                    {metadata.map((metaItem) => <td key={item[metaItem.label]}> {item[metaItem.name]} </td>)}
                                    <td key={998}> 
                                        <Button variant="contained" onClick={() => props.onEdit(item)}> <EditIcon/> </Button> 
                                        <Button variant="contained" onClick={() => props.onDelete(item)}> <DeleteIcon/> </Button> 
                                    </td>
                                </tr>
                            </>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}