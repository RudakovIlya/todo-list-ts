import React, {ChangeEvent, KeyboardEvent, useState, FC, memo} from 'react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormPropsType> = memo(({addItem}) => {
    const [error, setError] = useState<boolean>(false);
    const [titleTask, setTitle] = useState<string>('');

    const addItemCallback = () => {
        const trimmedTitle = titleTask.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle);
            setTitle('');
        } else {
            setError(true);
        }
    }

    const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && addItemCallback();
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

        error && setError(false);
    }

    return (
        <div>
            <TextField
                label={error ? 'Please, enter task title' : 'Title'}
                variant="outlined"
                value={titleTask}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownInputHandler}
                error={error}
            />
            <IconButton onClick={addItemCallback} color={'primary'}
                        style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
})

export default AddItemForm;