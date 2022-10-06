import React from 'react';
import NoteItem from './NoteItem';
import { showFormattedDate } from '../utils';

function NoteList({ notes, onDelete, onArchive }) {
    return notes.map((note) => (
        <NoteItem
            key={note.id}
            id={note.id}
            title={note.title}
            body={note.body}
            date={showFormattedDate(note.createdAt)}
            onArchive={onArchive}
            onDelete={onDelete}
            archived={note.archived}
        ></NoteItem>
    ));
}

export default NoteList;
