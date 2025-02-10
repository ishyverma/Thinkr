'use client';

import Editor from '@monaco-editor/react';

const VSEditor = () => {

    return (  
        <Editor 
            height={'100vh'} 
            width={'100vw'} 
            theme='vs-dark' 
            defaultLanguage='typescript' 
            defaultValue=''
        />
    );
}
 
export default VSEditor;