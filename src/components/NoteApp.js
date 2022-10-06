import React from 'react';
import { nanoid } from 'nanoid';
import NoteList from './NoteList';
import NoteInput from './NoteInput';
// import NoteSearch from './NoteSearch';
import { getInitialData } from '../utils';

class NoteApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: '',
            notesArchived: '',
            isSearching: false,
            query: '',
        };
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onSearchNoteHandler = this.onSearchNoteHandler.bind(this);
        this.onChangeKeywordHandler = this.onChangeKeywordHandler.bind(this);
    }
    componentDidMount() {
        const notes = getInitialData();
        this.setState({ notes });
    }

    onDeleteHandler(id, archived) {
        if (archived) {
            const notesArchived = this.state.notesArchived.filter(
                (note) => note.id !== id
            );
            this.setState({ notesArchived });
            return;
        } else {
            const notes = this.state.notes.filter((note) => note.id !== id);
            this.setState({ notes });
        }
    }
    onArchiveHandler(id, archived) {
        if (archived) {
            const note = this.state.notesArchived.find(
                (item) => item.id === id
            );
            note.archived = false;

            const notesArchived = this.state.notesArchived.filter(
                (note) => note.archived !== false
            );
            this.setState((prevState) => {
                return {
                    notesArchived,
                    notes: [...prevState.notes, note],
                };
            });
        } else {
            const note = this.state.notes.find((item) => item.id === id);
            note.archived = true;

            const notes = this.state.notes.filter(
                (note) => note.archived !== true
            );
            this.setState((prevState) => {
                return {
                    notesArchived: [...prevState.notesArchived, note],
                    notes,
                };
            });
        }
    }
    onAddNoteHandler({ id, title, createdAt, body, archived }) {
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: nanoid(8),
                        title,
                        createdAt: new Date(),
                        body,
                        archived,
                    },
                ],
            };
        });
    }
    onSearchNoteHandler({ keyword }) {
        if (keyword.length !== 0) {
            const query = new RegExp(keyword, 'i');
            this.setState({ query, isSearching: true });
        } else {
            this.setState({ query: '', isSearching: false });
        }
        console.log(keyword);
    }

    printSearchResult(query) {
        let notes = [];
        let notesArchived = [];
        if (this.state.notes.length !== 0) {
            notes = this.state.notes.filter(
                (note) => note.title.toLowerCase().search(query) !== -1
            );
        }
        if (this.state.notesArchived.length !== 0) {
            notesArchived = this.state.notesArchived.filter(
                (note) => note.title.toLowerCase().search(query) !== -1
            );
        }
        return { notes, notesArchived };
    }
    onChangeKeywordHandler(event) {
        const limit = 50;
        let query = '';

        query = event.target.value.slice(0, limit).toLowerCase();
        this.setState({ query, isSearching: true });

        console.log(query);
    }
    render() {
        let archivedSection = null;
        let notesSection = null;
        let notes = this.state.notes;
        let notesArchived = this.state.notesArchived;
        if (this.state.isSearching) {
            notes = this.printSearchResult(this.state.query).notes;
            notesArchived = this.printSearchResult(
                this.state.query
            ).notesArchived;
        }
        if (this.state.notes.length !== 0) {
            notesSection = (
                <div className="notes-list">
                    <NoteList
                        notes={notes}
                        onArchive={this.onArchiveHandler}
                        onDelete={this.onDeleteHandler}
                    ></NoteList>
                </div>
            );
        } else {
            notesSection = (
                <div className="notes-list__empty-message">
                    Tidak ada catatan
                </div>
            );
        }
        if (this.state.notesArchived.length !== 0) {
            archivedSection = (
                <div className="notes-list">
                    <NoteList
                        notes={notesArchived}
                        onArchive={this.onArchiveHandler}
                        onDelete={this.onDeleteHandler}
                    ></NoteList>
                </div>
            );
        } else {
            archivedSection = (
                <div className="notes-list__empty-message">
                    Tidak ada catatan
                </div>
            );
        }
        return (
            <div>
                <div className="note-app__header">
                    <h1>Notes</h1>
                    {/* <NoteSearch
                        searchNote={this.onSearchNoteHandler}
                    ></NoteSearch> */}
                    <form className="note-search">
                        <input
                            placeholder="cari catatan..."
                            value={this.state.query}
                            onChange={this.onChangeKeywordHandler}
                        ></input>
                    </form>
                </div>
                <div className="note-app__body">
                    <NoteInput addNote={this.onAddNoteHandler}></NoteInput>
                    <h2>Catatan Aktif</h2>
                    {notesSection}
                    <h2>Arsip</h2>
                    {archivedSection}
                </div>
            </div>
        );
    }
}

export default NoteApp;
