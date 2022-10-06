import React from 'react';

class NoteInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            createdAt: '',
            body: '',
            archived: false,
        };
        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }
    onTitleChangeHandler(event) {
        const limit = 50;

        this.setState(() => {
            return {
                title: event.target.value.slice(0, limit),
            };
        });
    }
    onBodyChangeHandler(event) {
        this.setState(() => {
            return {
                body: event.target.value,
            };
        });
    }
    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNote(this.state);
        this.setState({ title: '', body: '' });
    }
    render() {
        return (
            <div className="note-input">
                <h2>Buat Catatan</h2>
                <div className="note-input__title__char-limit">
                    Sisa karakter: {50 - this.state.title.length}
                </div>
                <form onSubmit={this.onSubmitEventHandler}>
                    <input
                        onChange={this.onTitleChangeHandler}
                        className="note-input__title"
                        value={this.state.title}
                        placeholder="ini adalah judul..."
                    ></input>
                    <textarea
                        onChange={this.onBodyChangeHandler}
                        className="note-input__body"
                        value={this.state.body}
                        placeholder="tulis catatanmu disini..."
                    ></textarea>
                    <button type="submit">Buat</button>
                </form>
            </div>
        );
    }
}

export default NoteInput;
