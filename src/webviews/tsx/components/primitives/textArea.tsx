/*!
 * Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react'
import { generateClassString, SubComponentProps } from '../../interfaces/common'

export interface TextAreaProps extends SubComponentProps {
    value: string | number
    name: string
    placeholder: string
    rows?: number
    cols?: number
    setState(key: string, value: string | number, callback?: () => void): void
    onChangeAction?(target: HTMLTextAreaElement): void
    onBlurAction?(target: HTMLTextAreaElement): void
}

export function TextArea(props: TextAreaProps) {
    return (
        <textarea
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            className={generateClassString(props)}
            rows={props.rows}
            cols={props.cols}
            onBlur={event => onBlurAction(event, props)}
            onChange={event => updateParentStateAndCallback(event, props)}
        />
    )
}

function updateParentStateAndCallback(event: React.ChangeEvent<HTMLTextAreaElement>, props: TextAreaProps) {
    const target = event.target
    props.setState(target.name, target.value, () => {
        if (props.onChangeAction) {
            props.onChangeAction(event.target)
        }
    })
}

function onBlurAction(event: React.FocusEvent<HTMLTextAreaElement>, props: TextAreaProps) {
    if (props.onBlurAction) {
        props.onBlurAction(event.target)
    }
}