import React from 'react';

class NoteSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
        };
        this.onChangeKeywordHandler = this.onChangeKeywordHandler.bind(this);
    }
    onChangeKeywordHandler(event) {
        const limit = 50;
        this.setState(() => {
            return {
                keyword: event.target.value.slice(0, limit),
            };
        });
        this.props.searchNote(this.state);
    }
    render() {
        return (
            <form className="note-search">
                <input
                    placeholder="cari catatan..."
                    value={this.state.keyword}
                    onChange={this.onChangeKeywordHandler}
                ></input>
            </form>
        );
    }
}

export default NoteSearch;
