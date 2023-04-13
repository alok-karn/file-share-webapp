import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase-config";
// import firebase from "firebase/app";
import "firebase/storage";
import { useDropzone } from "react-dropzone";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

registerPlugin(FilePondPluginImagePreview);

const FileUploader = () => {
    const [files, setFiles] = useState([]);
    const [downloadUrls, setDownloadUrls] = useState([]);

    useEffect(() => {
        if (files.length > 0) {
            const storageRef = firebase.storage().ref();
            const urls = [];
            files.forEach((file) => {
                const fileRef = storageRef.child(file.name);
                fileRef.getDownloadURL().then((url) => {
                    urls.push(url);
                    if (urls.length === files.length) {
                        setDownloadUrls(urls);
                    }
                });
            });
        }
    }, [files]);

    const onDrop = (acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "*/*",
    });

    const handleUpload = () => {
        const storageRef = firebase.storage().ref();
        files.forEach((file) => {
            const fileRef = storageRef.child(file.name);
            fileRef.put(file).then((snapshot) => {
                console.log("File Uploaded !");
            });
        });
        setFiles([]);
    };

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>
                        Drag 'n' drop some files here, or click to select files
                    </p>
                )}
            </div>
            <FilePond files={files} />
            {downloadUrls.length > 0 &&
                files.map((file, index) => (
                    <div key={index}>
                        <a
                            href={downloadUrls[index]}
                            target="_blank"
                            rel="noreferrer">
                            {file.name}
                        </a>
                    </div>
                ))}
            <button onClick={handleUpload}>Upload Files</button>
        </div>
    );
};

export default FileUploader;
