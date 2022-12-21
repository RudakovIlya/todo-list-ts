import React, {useState, FC, ChangeEvent, KeyboardEvent} from 'react';
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = ({title: propsTitle, changeTitle}) => {
    const [title, setTitle] = useState<string>(propsTitle)
    const [editMode, setEditMode] = useState<boolean>(false)

    const activateEditMode = () => {
        setEditMode(!editMode)
        changeTitle(title);
    }

    const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && activateEditMode()

    return (
        <>
            {
                editMode ? <TextField value={title} onChange={onChangeInputValue} onBlur={activateEditMode}
                                      onKeyDown={onEnterHandler}
                                      autoFocus variant="standard"/> :
                    <span onDoubleClick={activateEditMode}>{propsTitle}</span>
            }
        </>
    );
};

export default EditableSpan;