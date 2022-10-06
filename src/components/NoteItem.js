import React from 'react';
import ItemContent from './ItemContent';
import Action from './Action';

function NoteItem({ id, title, date, body, onDelete, onArchive, archived }) {
    return (
        <div className="note-item ">
            <ItemContent title={title} date={date} body={body}></ItemContent>
            <Action
                id={id}
                onArchive={onArchive}
                archived={archived}
                onDelete={onDelete}
            ></Action>
        </div>
    );
}

export default NoteItem;
