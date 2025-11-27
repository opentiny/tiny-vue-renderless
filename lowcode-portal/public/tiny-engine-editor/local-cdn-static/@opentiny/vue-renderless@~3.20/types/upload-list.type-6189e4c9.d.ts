import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams, ITinyVm } from './shared.type.js';

declare const $constants: {
    FILE_UPLOAD_INNER_TEMPLATE: string;
    UPLOAD_INNER: string;
    UPLOAD_INNER_TEMPLATE: string;
    UPLOAD_LIST_INNER: string;
    UPLOAD_LIST_INNER_TEMPLATE: string;
    ONLY_SUPPORT: string;
    COMMA: string;
    FILE_NOT_LESS_THAN: string;
    FILE_NOT_MORE_THAN: string;
    FILE_SIZE_RANGE: string;
    NUMBER_LIMIT: string;
    FILE_STATUS: {
        READY: string;
        SUCESS: string;
        UPLOADING: string;
        FAIL: string;
        DOWNLOADING: string;
    };
    LIST_TYPE: {
        TEXT: string;
        PICTURE_CARD: string;
        PICTURE: string;
        THUMB: string;
        PICTURE_SINGLE: string;
        DRAG_SINGLE: string;
        SAAS: string;
    };
    EDM: {
        CHUNKINIT: string;
        FILESIZE: string;
        CHUNKS: string;
        FILENAME: string;
        ISCHECKCODE: string;
        CHECKCODE: string;
        MULTIPART: string;
        DOCID: string;
        CHUNK: string;
        SINGLEUPLOAD: string;
        LOWERNAME: string;
        FOLDERKEY: string;
        FORMAT: string;
        WATER: string;
        SOURCE: string;
        URLCONTS: string;
        EDMTOKEN: string;
        TRACEID: string;
        TEXT: string;
        JSLIB: string;
        I18NKEY: string;
        LARGEFILEKEY: string;
        EXCEED: string;
        SIZE: string;
        SIZE_17G: number;
        SIZE_2G: number;
        SIZE_64M: number;
        SIZE_32M: number;
        SIZE_20M: number;
        SIZE_16M: number;
        SIZE_8M: number;
        SIZE_4M: number;
        SIZE_2M: number;
        SIZE_0M: number;
        FILEEMPTY: string;
        KIASCANTIP: string;
        FILENAMEEXCEEDS: string;
        THEFILENAME: string;
        CALCHASH: string;
        KIASTATUS: number;
        NumberExceed: string;
        notSupport: string;
        NOT_SUPPORT_NO_SUFFIX: string;
        STATUS_SPECIAL_CHARACTERS: number;
        NOT_SUPPORT_SPECIAL_CHARACTERS: string;
        DOC_PREVIEW: string;
    };
    IMAGE_TYPE: string;
    FILE_TYPE: {
        EXCEL: string;
        FILE: string;
        PDF: string;
        PICTURE: string;
        PPT: string;
        TEXT: string;
        WORD: string;
        ZIP: string;
        VIDEO: string;
        AUDIO: string;
    };
    SOURCE_TYPE: {
        SOURCE_VIDEO: string;
        SOURCE_AUDIO: string;
        SOURCE_PICTURE: string;
    };
    MODE: {
        BUBBLE: string;
    };
};
declare const fileUploadProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            FILE_UPLOAD_INNER_TEMPLATE: string;
            UPLOAD_INNER: string;
            UPLOAD_INNER_TEMPLATE: string;
            UPLOAD_LIST_INNER: string;
            UPLOAD_LIST_INNER_TEMPLATE: string;
            ONLY_SUPPORT: string;
            COMMA: string;
            FILE_NOT_LESS_THAN: string;
            FILE_NOT_MORE_THAN: string;
            FILE_SIZE_RANGE: string;
            NUMBER_LIMIT: string;
            FILE_STATUS: {
                READY: string;
                SUCESS: string;
                UPLOADING: string;
                FAIL: string;
                DOWNLOADING: string;
            };
            LIST_TYPE: {
                TEXT: string;
                PICTURE_CARD: string;
                PICTURE: string;
                THUMB: string;
                PICTURE_SINGLE: string;
                DRAG_SINGLE: string;
                SAAS: string;
            };
            EDM: {
                CHUNKINIT: string;
                FILESIZE: string;
                CHUNKS: string;
                FILENAME: string;
                ISCHECKCODE: string;
                CHECKCODE: string;
                MULTIPART: string;
                DOCID: string;
                CHUNK: string;
                SINGLEUPLOAD: string;
                LOWERNAME: string;
                FOLDERKEY: string;
                FORMAT: string;
                WATER: string;
                SOURCE: string;
                URLCONTS: string;
                EDMTOKEN: string;
                TRACEID: string;
                TEXT: string;
                JSLIB: string;
                I18NKEY: string;
                LARGEFILEKEY: string;
                EXCEED: string;
                SIZE: string;
                SIZE_17G: number;
                SIZE_2G: number;
                SIZE_64M: number;
                SIZE_32M: number;
                SIZE_20M: number;
                SIZE_16M: number;
                SIZE_8M: number;
                SIZE_4M: number;
                SIZE_2M: number;
                SIZE_0M: number;
                FILEEMPTY: string;
                KIASCANTIP: string;
                FILENAMEEXCEEDS: string;
                THEFILENAME: string;
                CALCHASH: string;
                KIASTATUS: number;
                NumberExceed: string;
                notSupport: string;
                NOT_SUPPORT_NO_SUFFIX: string;
                STATUS_SPECIAL_CHARACTERS: number;
                NOT_SUPPORT_SPECIAL_CHARACTERS: string;
                DOC_PREVIEW: string;
            };
            IMAGE_TYPE: string;
            FILE_TYPE: {
                EXCEL: string;
                FILE: string;
                PDF: string;
                PICTURE: string;
                PPT: string;
                TEXT: string;
                WORD: string;
                ZIP: string;
                VIDEO: string;
                AUDIO: string;
            };
            SOURCE_TYPE: {
                SOURCE_VIDEO: string;
                SOURCE_AUDIO: string;
                SOURCE_PICTURE: string;
            };
            MODE: {
                BUBBLE: string;
            };
        };
    };
    accept: StringConstructor;
    action: StringConstructor;
    autoUpload: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    beforeRemove: FunctionConstructor;
    beforeUpload: FunctionConstructor;
    data: ObjectConstructor;
    disabled: BooleanConstructor;
    display: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    drag: BooleanConstructor;
    dragger: BooleanConstructor;
    edm: {
        type: ObjectConstructor;
        default: () => {};
    };
    fileIconList: {
        type: ArrayConstructor;
        default: () => never[];
    };
    fileList: {
        type: ArrayConstructor;
        default: () => never[];
    };
    fileSize: {
        type: (ArrayConstructor | NumberConstructor)[];
        validator(value: any): boolean;
    };
    fileTitle: {
        type: StringConstructor;
        default: () => string;
    };
    headerShow: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    headers: {
        type: ObjectConstructor;
        default: () => {};
    };
    httpRequest: FunctionConstructor;
    limit: NumberConstructor;
    listType: {
        type: StringConstructor;
        default: () => string;
        validator: (value: string) => boolean;
    };
    mergeService: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    multiple: BooleanConstructor;
    name: {
        type: StringConstructor;
        default: () => string;
    };
    openDownloadFile: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    showFileList: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    size: StringConstructor;
    successStatistics: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    thumbOption: {
        type: ObjectConstructor;
        default: () => {
            popperClass: string;
            width: number;
            showDownload: boolean;
            downloadFile: FunctionConstructor;
            showDel: boolean;
            icon: string;
            showTooltip: boolean;
        };
    };
    type: {
        type: StringConstructor;
        default: () => string;
    };
    uploadIcon: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    withCredentials: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    isFolderTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
    listOption: {
        type: ObjectConstructor;
        default: () => {
            showUpdate: boolean;
            showDel: boolean;
        };
    };
    maxNameLength: {
        type: NumberConstructor;
        default: number;
    };
    scale: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    showName: {
        type: BooleanConstructor;
        default: boolean;
    };
    sourceType: {
        type: StringConstructor;
        default: string;
        validator(val: any): any;
    };
    showTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    displayOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    customClass: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
    hwh5: ObjectConstructor;
    mode: {
        type: StringConstructor;
        default: string;
        validator(val: any): boolean;
    };
    cacheToken: {
        type: BooleanConstructor;
        default: boolean;
    };
    lockScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    compact: {
        type: BooleanConstructor;
        default: boolean;
    };
    beforeAddFile: FunctionConstructor;
    encryptConfig: {
        type: ObjectConstructor;
        default: () => {
            enabled: boolean;
            encrypt: boolean;
            watermark: string;
        };
    };
    promptTip: {
        type: BooleanConstructor;
        default: boolean;
    };
    isHidden: {
        type: BooleanConstructor;
        default: boolean;
    };
    pasteUpload: {
        type: BooleanConstructor;
        default: boolean;
    };
    reUploadable: BooleanConstructor;
    reUploadTip: FunctionConstructor;
    imageBgColor: StringConstructor;
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

/**
 * Copyright (c) 2022 - present TinyVue Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */

declare const noopFnCreator: (fn: Function, propName?: string) => Function;
declare const computedUploadDisabled: ({ props, state }: Pick<IFileUploadRenderlessParams, 'props' | 'state'>) => () => boolean;
declare const computedUploadingSize: ({ state, constants }: Pick<IFileUploadRenderlessParams, 'state' | 'constants'>) => () => number;
declare const watchListType: ({ constants, state, api }: Pick<IFileUploadRenderlessParams, 'constants' | 'state' | 'api'>) => (type: string) => void;
declare const watchFileList: ({ constants, state, props, api }: Pick<IFileUploadRenderlessParams, 'constants' | 'state' | 'props' | 'api'>) => (fileList: IFileUploadFile[]) => void;
declare const beforeUpload: ({ props, api, Modal, constants, t, state }: Pick<IFileUploadRenderlessParams, 'props' | 'api' | 'constants' | 't' | 'state'> & IFileUploadModalVm) => (file: IFileUploadFile, autoRemove: boolean, doUpload: Function) => any;
declare const startUpload: ({ state, constants, vm, Modal, api, t }: Pick<IFileUploadRenderlessParams, 'state' | 'constants' | 'vm' | 'api' | 't'> & IFileUploadModalVm) => (file: IFileUploadFile, isList: boolean) => void;
declare const properFileSize: ({ props, state, api, constants, Modal, t }: Pick<IFileUploadRenderlessParams, 'props' | 'state' | 'constants' | 'api' | 't'> & IFileUploadModalVm) => (file: IFileUploadFile) => boolean;
declare const addFileToList: ({ api, constants, emit, props, state, mode }: Pick<IFileUploadRenderlessParams, 'api' | 'constants' | 'emit' | 'props' | 'state' | 'mode'>) => (rawFile: IFileUploadFile, updateId: string, reUpload: boolean) => void;
declare const getFileHash: ({ emit, Modal, constants, t, CryptoJS, state }: Pick<IFileUploadRenderlessParams, "emit" | "state" | "t" | "constants"> & IFileUploadModalVm & {
    CryptoJS: object;
}) => ({ file, chunkSize, showTips }: {
    file: IFileUploadFile;
    chunkSize: number;
    showTips: boolean;
}) => Promise<unknown>;
declare const handleStart: ({ api, constants, props, state, vm }: Pick<IFileUploadRenderlessParams, 'api' | 'constants' | 'props' | 'state' | 'vm'>) => (rawFiles: IFileUploadFile[], updateId: string, reUpload?: boolean) => void;
declare const calcUploadingFilesInfo: ({ state, constants }: Pick<IFileUploadRenderlessParams, 'state' | 'constants'>) => () => {
    percentage: number;
    uploadList: IFileUploadFile[];
    uploadedCount: number;
};
declare const handleProgress: ({ api, constants, emit, state }: Pick<IFileUploadRenderlessParams, 'api' | 'constants' | 'emit' | 'state'>) => (event: any, rawFile: File) => void;
declare const handleSuccess: ({ api, constants, emit, state, props, Modal, t }: Pick<IFileUploadRenderlessParams, 'api' | 'constants' | 'emit' | 'state' | 't' | 'props'>) => (res: any, rawFile: IFileUploadFile) => void;
declare const handleError: ({ api, constants, emit, state, props }: Pick<IFileUploadRenderlessParams, 'api' | 'constants' | 'emit' | 'state' | 'props'>) => (err: any, rawFile: IFileUploadFile) => void;
declare const handleRemove: ({ api, emit, props, state, constants }: Pick<IFileUploadRenderlessParams, 'api' | 'emit' | 'props' | 'state' | 'constants'>) => (file: IFileUploadFile, raw: File) => void;
declare const handleReUpload: ({ vm, constants }: Pick<IFileUploadRenderlessParams, 'vm' | 'constants'>) => (file: IFileUploadFile) => void;
declare const handleReUploadTotal: (api: IFileUploadRenderlessParams['api']) => (files: IFileUploadFile[]) => void;
declare const clearUploadingFiles: ({ constants, state }: Pick<IFileUploadRenderlessParams, 'constants' | 'state'>) => () => void;
declare const getFile: (state: IFileUploadRenderlessParams['state']) => (rawFile: IFileUploadFile) => IFileUploadFile;
declare const abort$1: ({ constants, vm, state }: Pick<IFileUploadRenderlessParams, 'constants' | 'vm' | 'state'>) => (file: IFileUploadFile) => void;
declare const abortDownload: ({ state }: Pick<IFileUploadRenderlessParams, 'state'>) => (file: IFileUploadFile, batch?: boolean) => void;
declare const clearFiles: (state: IFileUploadRenderlessParams['state']) => () => void;
declare const submit: ({ api, constants, vm, state, props }: Pick<IFileUploadRenderlessParams, 'api' | 'constants' | 'vm' | 'state' | 'props'>) => () => void;
declare const handleClick$2: ({ constants, vm }: Pick<IFileUploadRenderlessParams, 'constants' | 'vm'>) => () => any;
declare const getFileUploadUrl: (service: IFileUploadRenderlessParams['service']) => () => Promise<string>;
declare const updateUrl: ({ api, props, state }: Pick<IFileUploadRenderlessParams, 'api' | 'props' | 'state'>) => () => void;
declare const handleFileClick: ({ props, emit }: Pick<IFileUploadRenderlessParams, 'props' | 'emit'>) => (file: IFileUploadFile) => void;
declare const getTranslateFile: ({ api, isChunk, isLessThan17G, file, state }: Pick<IFileUploadRenderlessParams, "state" | "api"> & {
    isChunk: boolean;
    isLessThan17G: boolean;
    file: IFileUploadFile;
}) => (data: IFileUploadFile, type: string, index?: number) => void;
declare const getHandleSuccess: ({ state, downloadOps, file, translateFile, isChunk, isLessThan17G }: Pick<IFileUploadRenderlessParams, "state"> & {
    downloadOps: IFileUploadEdmDownload;
    file: IFileUploadFile;
    translateFile: ReturnType<typeof getTranslateFile>;
    isChunk: boolean;
    isLessThan17G: boolean;
}) => (data: any, type: string, index?: number) => boolean;
declare const getCalcProgress: () => (evt: any) => number;
declare const modifyServiceUrlSingle: ({ state, props, constants }: Pick<IFileUploadRenderlessParams, 'state' | 'props' | 'constants'>) => ({ file, serviceUrl, range }: {
    file: IFileUploadFile;
    serviceUrl: string;
    range: object;
}) => string;
declare const getKiaScanTip: ({ Modal, constants, t }: Pick<IFileUploadRenderlessParams, 'constants' | 't'> & IFileUploadModalVm) => ({ data }: {
    data: IFileUploadFile;
}) => IFileUploadModalVm | undefined;
declare const validateDownloadStatus: ({ state, Modal }: Pick<IFileUploadRenderlessParams, 'state'> & IFileUploadModalVm) => ({ downloadOps, file, isLessThan17G, data }: {
    downloadOps: IFileUploadEdmDownload;
    file: IFileUploadFile;
    isLessThan17G: boolean;
    data: any;
}) => true | undefined;
declare const createDownloadCancelToken: ({ state, service }: Pick<IFileUploadRenderlessParams, 'state' | 'service'>) => (file: IFileUploadFile) => string;
declare const downloadFileSingle: ({ service, constants, props, state, api, emit }: Pick<IFileUploadRenderlessParams, 'service' | 'constants' | 'props' | 'state' | 'api' | 'emit'>) => (args: IFileUploadDownloadFileSingle) => void;
declare const downloadFileBatch: ({ api, service, props, state, emit }: Pick<IFileUploadRenderlessParams, 'api' | 'service' | 'props' | 'state' | 'emit'>) => (args: IFileUploadDownloadFileSingle) => void;
declare const downloadFileSingleHwh5: ({ state, props, emit, constants }: Pick<IFileUploadRenderlessParams, 'state' | 'props' | 'emit' | 'constants'>) => ({ file }: {
    file: IFileUploadFile;
}) => void;
declare const downloadFile$1: ({ api, state }: Pick<IFileUploadRenderlessParams, 'api' | 'state'>) => (file: IFileUploadFile) => void;
declare const downloadFileSingleInner: ({ props, state, api, constants }: {
    props: any;
    state: any;
    api: any;
    constants: any;
}) => ({ file, isBatch }: {
    file: any;
    isBatch: any;
}) => void;
declare const getDownloadFileInfo: ({ api, state, props, service }: Pick<IFileUploadRenderlessParams, 'api' | 'state' | 'props' | 'service'>) => ({ docId }: {
    docId: string;
}) => any;
declare const largeDocumentDownload: ({ api, state }: Pick<IFileUploadRenderlessParams, 'api' | 'state'>) => ({ file, isBatch, isLessThan17G }: IFileUploadLargeDocumentDownload) => void;
declare const sliceDownloadChunk: ({ state }: Pick<IFileUploadRenderlessParams, 'state'>) => (file: IFileUploadFile) => IFileUploadSliceDownloadChunk[][];
declare const batchSegmentDownload: ({ state, api }: Pick<IFileUploadRenderlessParams, 'state' | 'api'>) => ({ batchIndex, batches, docId, isBatch, isLessThan17G }: IFileUploadBatchSegmentDownload) => void;
declare const downloadFileInner: ({ api, props, state }: Pick<IFileUploadRenderlessParams, 'api' | 'props' | 'state'>) => ({ batchIndex, file, range, isBatch, isChunk, isLessThan17G }: IFileUploadDownloadFileInner) => void;
declare const afterDownload: ({ api, state }: Pick<IFileUploadRenderlessParams, 'api' | 'state'>) => ({ batchIndex, range, data, file, isBatch, isChunk, isLessThan17G }: IFileUploadAfterDownload) => void;
declare const setWriterFile: ({ state, emit, Streamsaver }: Pick<IFileUploadRenderlessParams, "emit" | "state"> & {
    Streamsaver: IFileUploadStreamsaver;
}) => ({ data, index, isLessThan17G, file }: IFileUploadSetWriterFile) => Function;
declare const getFormData$1: ({ constants, props, state }: Pick<IFileUploadRenderlessParams, 'constants' | 'props' | 'state'>) => ({ formData, file, type }: IFileUploadGetFormData) => IUploadFormData;
declare const largeDocumentUpload: ({ api, Modal, state, t, emit, constants }: Pick<IFileUploadRenderlessParams, 'api' | 'state' | 't' | 'emit' | 'constants'> & IFileUploadModalVm) => (file: IFileUploadFile) => void;
declare const segmentUploadInit: ({ api, props, service, state, constants }: Pick<IFileUploadRenderlessParams, 'api' | 'props' | 'service' | 'state' | 'constants'>) => (file: IFileUploadFile) => Promise<unknown>;
declare const segmentUpload: ({ api, props, service, state, emit, constants, CryptoJS }: Pick<IFileUploadRenderlessParams, "emit" | "props" | "state" | "api" | "constants" | "service"> & {
    CryptoJS: object;
}) => (batchIndex: number, file: IFileUploadFile, progress: {
    file: IFileUploadFile;
}) => void;
declare const batchSegmentUpload: ({ api, constants, props, vm, state }: Pick<IFileUploadRenderlessParams, 'api' | 'constants' | 'props' | 'vm' | 'state'>) => ({ docId, batchIndex, batches, progress }: IFileUploadBatchSegmentUpload) => void;
declare const sliceChunk: ({ state }: Pick<IFileUploadRenderlessParams, 'state'>) => (file: IFileUploadFile) => Promise<any>[][];
declare const getToken: ({ constants, props, state, t, Modal }: Pick<IFileUploadRenderlessParams, 'constants' | 'props' | 'state' | 't'> & IFileUploadModalVm) => ({ token, file, isOnlinePreview, type, isinit }: {
    token: Function;
    file: IFileUploadFile;
    isOnlinePreview: boolean;
    type: string;
    isinit: boolean;
}) => Promise<unknown>;
declare const previewFile: ({ api, props }: Pick<IFileUploadRenderlessParams, 'api' | 'props'>) => (file: IFileUploadFile, open?: boolean) => Promise<unknown>;
declare const getNewTabPreviewUrl: ({ api }: Pick<IFileUploadRenderlessParams, 'api'>) => (file: IFileUploadFile) => Promise<unknown>;
declare const previewFileSingle: ({ api, state, props, constants, service }: Pick<IFileUploadRenderlessParams, 'api' | 'state' | 'props' | 'constants' | 'service'>) => ({ file, resolve, open }: {
    file: IFileUploadFile;
    resolve: (res: any) => void;
    open: boolean;
}) => void;
declare const previewFileBatch: ({ service, props, state, api }: Pick<IFileUploadRenderlessParams, 'service' | 'props' | 'state' | 'api'>) => ({ file, resolve, open }: {
    file: any;
    resolve: any;
    open: any;
}) => void;
declare const getPreviewUrlSync: ({ constants, props, state }: Pick<IFileUploadRenderlessParams, 'constants' | 'props' | 'state'>) => (file: object, batch?: boolean) => string;
declare const previewImage: ({ api, props, service }: Pick<IFileUploadRenderlessParams, 'api' | 'props' | 'service'>) => (file: IFileUploadFile) => Promise<unknown>;
declare const previewImageSingle: ({ service, state, props }: Pick<IFileUploadRenderlessParams, 'service' | 'state' | 'props'>) => ({ file, url }: {
    file: IFileUploadFile;
    url: string;
}) => any;
declare const previewImageBatch: ({ service, api }: Pick<IFileUploadRenderlessParams, 'service' | 'api'>) => ({ url, file }: {
    url: string;
    file: IFileUploadFile;
}) => any;
declare const getDialogConfigObj: ({ props, state, t, constants }: Pick<IFileUploadRenderlessParams, 'props' | 'state' | 't' | 'constants'>) => () => object;
declare const computeDocChunkSize: ({ props, state, constants }: Pick<IFileUploadRenderlessParams, 'props' | 'state' | 'constants'>) => () => void;
declare const computedSourcetype: ({ props, constants }: Pick<IFileUploadRenderlessParams, 'props' | 'constants'>) => () => string[];
declare const getFileSourceType: ({ state, props, constants }: Pick<IFileUploadRenderlessParams, 'state' | 'props' | 'constants'>) => ({ file }: {
    file: IFileUploadFile;
}) => string | undefined;
declare const updateFile: ({ constants, vm }: Pick<IFileUploadRenderlessParams, 'constants' | 'vm'>) => (file: IFileUploadFile) => void;
declare const handleChange$1: ({ vm, constants }: Pick<IFileUploadRenderlessParams, 'vm' | 'constants'>) => (file: IFileUploadFile) => void;
declare const handleTriggerClick$1: ({ vm, state, constants, props, emit }: Pick<IFileUploadRenderlessParams, 'vm' | 'state' | 'constants' | 'props' | 'emit'>) => ($event: Event, type: string) => void;
declare const onBeforeDestroy$1: (state: IFileUploadRenderlessParams['state']) => () => void;
declare const handleClickFileList: ({ state, emit }: Pick<IFileUploadRenderlessParams, 'state' | 'emit'>) => (file: IFileUploadFile) => void;
declare const mounted$2: ({ vm, state }: Pick<IFileUploadRenderlessParams, 'vm' | 'state'>) => () => void;

/**
 * Copyright (c) 2022 - present TinyVue Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */

declare const parsePercentage: () => (val: string) => number;
declare const handleClick$1: ({ props, api, parent }: Pick<IUploadListRenderlessParams, 'props' | 'api' | 'parent'>) => (e: Event, file: IFileUploadFile) => Function;
declare const downloadFile: (service: IUploadListRenderlessParams['service']) => (file: IFileUploadFile) => void;
declare const picturefilePreview: (state: IUploadListRenderlessParams['state']) => (index: number) => void;
declare const getDeleteData: (emit: IUploadListRenderlessParams['emit']) => (data: string[]) => void;
declare const showOperatePanel: ({ state }: Pick<IUploadListRenderlessParams, 'state'>) => ({ file }: {
    file: IFileUploadFile;
}) => void;
declare const reUpload: ({ emit, props, parent }: Pick<IUploadListRenderlessParams, 'emit' | 'props' | 'parent'>) => (file: IFileUploadFile) => void;
declare const play: ({ vm, api, props }: Pick<IUploadListRenderlessParams, 'vm' | 'api' | 'props'>) => ({ file, index, type }: {
    file: IFileUploadFile;
    index: number;
    type: string;
}) => any;
declare const pause: ({ vm, props }: Pick<IUploadListRenderlessParams, 'vm' | 'props'>) => ({ file, index, type }: {
    file: IFileUploadFile;
    index: number;
    type: string;
}) => any;
declare const handleLoadedmetadata: ({ vm }: Pick<IUploadListRenderlessParams, 'vm'>) => ({ e, file }: {
    e: Event;
    file: IFileUploadFile;
}) => void;
declare const handleTimeupdate: () => ({ e, file }: {
    e: Event;
    file: IFileUploadFile;
}) => void;
declare const getFileType: () => ({ file }: {
    file: IFileUploadFile;
}) => string;
declare const getFileIcon: ({ constants }: Pick<IUploadListRenderlessParams, 'constants'>) => ({ type }: {
    type: string;
}) => {
    name: string;
    color: string;
};
declare const remove: ({ emit }: Pick<IUploadListRenderlessParams, 'emit'>) => ({ file }: {
    file: IFileUploadFile;
}) => void;
declare const calcUploadListLiWidth: ({ vm, nextTick, props, constants }: Pick<IUploadListRenderlessParams, 'vm' | 'nextTick' | 'props' | 'constants'>) => () => void;
declare const calcVisible: ({ props, constants, emit }: Pick<IUploadListRenderlessParams, 'props' | 'constants' | 'emit'>) => () => void;
declare const getNotSuccessFiles: ({ props, constants }: Pick<IUploadListRenderlessParams, 'props' | 'constants'>) => () => object[];
declare const chooseFile: ({ state, constants }: Pick<IUploadListRenderlessParams, 'state' | 'constants'>) => (type: string) => void;
declare const handleTriggerClick: ({ state, props }: Pick<IUploadListRenderlessParams, 'state' | 'props'>) => ($event: Event, type: string) => Promise<unknown>;
declare const mounted$1: ({ api, vm }: Pick<IUploadListRenderlessParams, 'api' | 'vm'>) => () => void;
declare const destroyed: ({ props, vm }: Pick<IUploadListRenderlessParams, 'props' | 'vm'>) => () => void;

declare const uploadProps: {
    accept: StringConstructor;
    action: {
        type: StringConstructor;
        default: string;
    };
    autoUpload: BooleanConstructor;
    beforeUpload: FunctionConstructor;
    pasteUpload: BooleanConstructor;
    data: ObjectConstructor;
    disabled: BooleanConstructor;
    drag: BooleanConstructor;
    edmToken: {
        type: ObjectConstructor;
        default: () => {};
    };
    fileList: {
        type: ArrayConstructor;
        default: () => never[];
    };
    headers: ObjectConstructor;
    httpRequest: {
        type: FunctionConstructor;
        default: (option: any) => XMLHttpRequest | undefined;
    };
    isFolder: {
        type: BooleanConstructor;
        default: boolean;
    };
    limit: NumberConstructor;
    listType: StringConstructor;
    multiple: BooleanConstructor;
    name: {
        type: StringConstructor;
        default: string;
    };
    onError: FunctionConstructor;
    onExceed: FunctionConstructor;
    onPreview: {
        type: FunctionConstructor;
        default: () => void;
    };
    onProgress: FunctionConstructor;
    onRemove: {
        type: FunctionConstructor;
        default: () => void;
    };
    onStart: FunctionConstructor;
    onSuccess: FunctionConstructor;
    type: StringConstructor;
    withCredentials: BooleanConstructor;
    isHidden: {
        type: BooleanConstructor;
        default: boolean;
    };
    scale: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    sourceType: {
        type: StringConstructor;
        default: string;
        validator(val: string): boolean;
    };
    displayOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    customClass: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
    handleTriggerClick: {
        type: FunctionConstructor;
        default: () => void;
    };
    mode: StringConstructor;
    showTitle: BooleanConstructor;
    isHwh5: {
        type: BooleanConstructor;
        default: boolean;
    };
    tipMessage: {
        type: StringConstructor;
        default: string;
    };
    promptTip: {
        type: BooleanConstructor;
        default: boolean;
    };
    showFileList: {
        type: BooleanConstructor;
        default: boolean;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

/**
 * Copyright (c) 2022 - present TinyVue Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */

declare const isImage: (str: string) => boolean;
declare const handleChange: (api: IUploadRenderlessParams['api']) => (event: Event) => void;
declare const handlePaste: ({ api, props }: Pick<IUploadRenderlessParams, 'api' | 'props'>) => (event: ClipboardEvent) => void;
declare const getFormData: ({ constants, state, props }: Pick<IUploadRenderlessParams, 'constants' | 'state' | 'props'>) => ({ formData, file, type }: {
    formData: IUploadFormData;
    file: IFileUploadFile;
    type: string;
}) => void;
declare const uploadFiles: ({ state, constants, Modal, props, t }: Pick<IUploadRenderlessParams, 'state' | 'constants' | 'props' | 't'> & IFileUploadModalVm) => (files: FileList | IFileUploadFile[]) => void;
declare const upload: ({ api, props, refs }: Pick<IUploadRenderlessParams, 'api' | 'props' | 'refs'>) => (rawFile: File) => void;
declare const abort: ({ state, props, constants }: Pick<IUploadRenderlessParams, 'state' | 'props' | 'constants'>) => (file: IFileUploadFile) => void;
declare const post: ({ api, constants, props, state, service }: Pick<IUploadRenderlessParams, 'api' | 'constants' | 'props' | 'state' | 'service'>) => (rawFile: IFileUploadFile) => void;
declare const handleClick: ({ props, refs, state }: Pick<IUploadRenderlessParams, 'props' | 'refs' | 'state'>) => ($event: Event, type: string) => void;
declare const handleKeydown: (api: IUploadRenderlessParams['api']) => (event: KeyboardEvent) => void;
declare const handleUpdate: ({ props, state }: Pick<IUploadRenderlessParams, 'props' | 'state'>) => (file: IFileUploadFile) => void;
declare const mounted: ({ state, props, api }: Pick<IUploadRenderlessParams, 'state' | 'props' | 'api'>) => () => void;
declare const onBeforeDestroy: (state: IUploadRenderlessParams['state']) => () => void;

type IUploadStateHeader = {
    [propName: string]: string;
} | undefined;
interface IUploadState {
    mouseover: boolean;
    reqs: {
        uid?: string;
    };
    uploader: IFileUploadVm;
    accecpt: string;
    isEdm: boolean;
    openEdmDownload: boolean;
    headers: IUploadStateHeader;
    formData: object;
    cancelToken: object;
    updateId: string;
    updateInput: null | HTMLInputElement;
}
interface IUploadApi {
    state: IUploadState;
    isImage: typeof isImage;
    abort: ReturnType<typeof abort>;
    getFormData: ReturnType<typeof getFormData>;
    handleClick: ReturnType<typeof handleClick>;
    onBeforeDestroy: ReturnType<typeof onBeforeDestroy>;
    handleUpdate: ReturnType<typeof handleUpdate>;
    handlePaste: ReturnType<typeof handlePaste>;
    uploadFiles: ReturnType<typeof uploadFiles>;
    post: ReturnType<typeof post>;
    handleChange: ReturnType<typeof handleChange>;
    handleKeydown: ReturnType<typeof handleKeydown>;
    upload: ReturnType<typeof upload>;
    mounted: ReturnType<typeof mounted>;
}
type IUploadProps = ExtractPropTypes<typeof uploadProps>;
type IUploadRenderlessParamUtils = ISharedRenderlessParamUtils<IFileUploadConstants>;
type IUploadRenderlessParams = ISharedRenderlessFunctionParams<IFileUploadConstants> & {
    state: IUploadState;
    props: IUploadProps;
    api: IUploadApi;
};
interface IUploadRenderlessOtherParams {
    rawFile: IFileUploadFile;
    uploaderInner: ITinyVm<IFileUploadConstants>;
    uid: string;
}
interface IUploadFormData extends FormData {
    append(name: string, value: boolean | string | number | Blob, fileName?: string): void;
}
interface IUploadOptionsOfPost {
    headers: object;
    withCredentials: boolean;
    file: File;
    data: IUploadFormData | undefined | Record<string, any>;
    filename: string;
    action?: string;
    onSuccess: (res: object) => void;
    onProgress?: (event: Event) => void;
    onError: (error: object) => void;
    [x: string]: any;
}
interface IUploadOptionsOfHwh5 {
    edmAuth: {
        edmToken: string;
        appId: string;
    };
    filePath: string;
    progress: number;
    onProgress: (data: object) => void;
    onSuccess: (res: object) => void;
    onError: (error: object) => void;
}

interface IFileUploadState {
    url: string;
    updateId: string;
    currentDownloadFiles: string;
    tempIndex: number;
    draging: boolean;
    uploadFiles: IFileUploadFile[];
    dragOver: boolean;
    httpRequest: () => void;
    form: ITinyVm<unknown>;
    listeners: object;
    docSize: number;
    chunkSize: number;
    chunkBatchLimit: number;
    downloadChunkLimit: number;
    batchQueue: object;
    batchQueueListen: object;
    batchCancelToken: object;
    replayAtoms: object;
    chunkUploadUrl: string;
    largeFileInfo: object;
    headers: object;
    accept: string | undefined;
    edmToken: object;
    isSuccess: boolean;
    singleMaxSize: number;
    formData: object;
    showPreview: boolean;
    iframeUrl: string;
    fileWater: boolean;
    tabUrl: string;
    cacheDocuments: object;
    isEdm: boolean;
    uploadDisabled: boolean;
    dialogConfigObj: object;
    uploadingFiles: IFileUploadFile[];
    currentUploadingFileUids: number[];
    uploadingSize: number;
    isEntireCheckCode: boolean;
    downloadBatchQueue: object;
    downloadBatchQueueListen: object;
    downloadChunkFile: object;
    downloadReplayAtoms: object;
    errorStatusCodes: number[];
    hasFileInfoInterface: string;
    currentDownloadFile: string;
    isDragover: boolean;
    downloadCancelToken: object;
    downloadCancelData: object;
    isHwh5: boolean;
    selected: null | object;
    types: string;
    triggerClickType: string;
    visible: boolean;
    downloadParamsWhitelist: string[];
}
interface IFileUploadApi {
    state: IFileUploadState;
    sliceChunk: ReturnType<typeof sliceChunk>;
    getFormData: ReturnType<typeof getFormData$1>;
    abort: ReturnType<typeof abort$1>;
    handleClick: ReturnType<typeof handleClick$2>;
    handleFileClick: ReturnType<typeof handleFileClick>;
    getFile: ReturnType<typeof getFile>;
    clearFiles: ReturnType<typeof clearFiles>;
    watchFileList: ReturnType<typeof watchFileList>;
    watchListType: ReturnType<typeof watchListType>;
    onBeforeDestroy: ReturnType<typeof onBeforeDestroy$1>;
    computedUploadDisabled: ReturnType<typeof computedUploadDisabled>;
    computedUploadingSize: ReturnType<typeof computedUploadingSize>;
    getFileUploadUrl: ReturnType<typeof getFileUploadUrl>;
    getToken: ReturnType<typeof getToken>;
    getDialogConfigObj: ReturnType<typeof getDialogConfigObj>;
    computeDocChunkSize: ReturnType<typeof computeDocChunkSize>;
    updateFile: ReturnType<typeof updateFile>;
    getPreviewUrlSync: ReturnType<typeof getPreviewUrlSync>;
    ordinaryDownload: ReturnType<typeof downloadFile>;
    clearUploadingFiles: ReturnType<typeof clearUploadingFiles>;
    calcUploadingFilesInfo: ReturnType<typeof calcUploadingFilesInfo>;
    properFileSize: ReturnType<typeof properFileSize>;
    mounted: ReturnType<typeof mounted$2>;
    previewFileSingle: ReturnType<typeof previewFileSingle>;
    previewFileBatch: ReturnType<typeof previewFileBatch>;
    previewImageSingle: ReturnType<typeof previewImageSingle>;
    previewImageBatch: ReturnType<typeof previewImageBatch>;
    abortDownload: ReturnType<typeof abortDownload>;
    createDownloadCancelToken: ReturnType<typeof createDownloadCancelToken>;
    computedSourcetype: ReturnType<typeof computedSourcetype>;
    getFileSourceType: ReturnType<typeof getFileSourceType>;
    segmentUploadInit: ReturnType<typeof segmentUploadInit>;
    segmentUpload: ReturnType<typeof segmentUpload>;
    addFileToList: ReturnType<typeof addFileToList>;
    downloadFile: ReturnType<typeof downloadFile$1>;
    downloadFileSingleInner: ReturnType<typeof downloadFileSingleInner>;
    previewImage: ReturnType<typeof previewImage>;
    previewFile: ReturnType<typeof previewFile>;
    getNewTabPreviewUrl: ReturnType<typeof getNewTabPreviewUrl>;
    submit: ReturnType<typeof submit>;
    handleStart: ReturnType<typeof handleStart>;
    batchSegmentUpload: ReturnType<typeof batchSegmentUpload>;
    largeDocumentUpload: ReturnType<typeof largeDocumentUpload>;
    handleProgress: ReturnType<typeof handleProgress>;
    handleSuccess: ReturnType<typeof handleSuccess>;
    handleError: ReturnType<typeof handleError>;
    handleRemove: ReturnType<typeof handleRemove>;
    updateUrl: ReturnType<typeof updateUrl>;
    startUpload: ReturnType<typeof startUpload>;
    beforeUpload: ReturnType<typeof beforeUpload>;
    getDownloadFileInfo: ReturnType<typeof getDownloadFileInfo>;
    largeDocumentDownload: ReturnType<typeof largeDocumentDownload>;
    sliceDownloadChunk: ReturnType<typeof sliceDownloadChunk>;
    batchSegmentDownload: ReturnType<typeof batchSegmentDownload>;
    downloadFileInner: ReturnType<typeof downloadFileInner>;
    setWriterFile: ReturnType<typeof setWriterFile>;
    afterDownload: ReturnType<typeof afterDownload>;
    getFileHash: ReturnType<typeof getFileHash>;
    modifyServiceUrlSingle: ReturnType<typeof modifyServiceUrlSingle>;
    getKiaScanTip: ReturnType<typeof getKiaScanTip>;
    downloadFileSingle: ReturnType<typeof downloadFileSingle>;
    downloadFileBatch: ReturnType<typeof downloadFileBatch>;
    downloadFileSingleHwh5: ReturnType<typeof downloadFileSingleHwh5>;
    validateDownloadStatus: ReturnType<typeof validateDownloadStatus>;
    handleChange: ReturnType<typeof handleChange$1>;
    handleClickFileList: ReturnType<typeof handleClickFileList>;
    handleTriggerClick: ReturnType<typeof handleTriggerClick$1>;
    handleReUpload: ReturnType<typeof handleReUpload>;
    handleReUploadTotal: ReturnType<typeof handleReUploadTotal>;
}
type IFileUploadNoopFnCreator = ReturnType<typeof noopFnCreator>;
interface IFileUploadService {
    get: IFileUploadNoopFnCreator;
    post: IFileUploadNoopFnCreator;
    request: IFileUploadNoopFnCreator;
    all: IFileUploadNoopFnCreator;
    spread: IFileUploadNoopFnCreator;
    cancelToken: IFileUploadNoopFnCreator;
    getSingleUploadUrl: IFileUploadNoopFnCreator;
    getFileUploadUrl: IFileUploadNoopFnCreator;
    getFileDownloadUrl: IFileUploadNoopFnCreator;
    getSingleDownloadUrl: IFileUploadNoopFnCreator;
    getPackageDownloadUrl: IFileUploadNoopFnCreator;
    getLargeFileInitUrl: IFileUploadNoopFnCreator;
    getChunkUploadUrl: IFileUploadNoopFnCreator;
    getPreviewUrl: IFileUploadNoopFnCreator;
    getDocumentInfoUrl: IFileUploadNoopFnCreator;
    getPreviewUrlBatch: IFileUploadNoopFnCreator;
    httpRequest: IFileUploadNoopFnCreator;
}
type IFileUploadProps = ExtractPropTypes<typeof fileUploadProps>;
type IFileUploadConstants = typeof $constants;
type IFileUploadRenderlessParamUtils = ISharedRenderlessParamUtils<IFileUploadConstants>;
type IFileUploadRenderlessParams = ISharedRenderlessFunctionParams<IFileUploadConstants> & {
    state: IFileUploadState;
    props: IFileUploadProps;
    api: IFileUploadApi;
};
type IFileUploadVm = ITinyVm<IFileUploadConstants> & IFileUploadProps;
interface IFileUploadModalVm {
    Modal: ITinyVm<unknown>;
}
type IFileUploadFile = File & {
    [propName: string]: any;
};
interface IFileUploadEdmDownload {
    token: string;
    packageToken: string;
    loading: Function;
    fail: Function;
    paramsWhitelist: any[];
}
interface IFileUploadDownloadFileSingleInner {
    file: IFileUploadFile;
    isBatch: boolean;
}
interface IFileUploadLargeDocumentDownload extends IFileUploadDownloadFileSingleInner {
    isLessThan17G?: boolean;
}
interface IFileUploadDownloadFileInner extends IFileUploadLargeDocumentDownload {
    batchIndex?: number;
    range?: {
        index: number;
    };
    isChunk?: boolean;
}
interface IFileUploadDownloadFileSingle extends IFileUploadDownloadFileInner {
    calcProgress: ReturnType<typeof getCalcProgress>;
    isFinished: boolean;
    handleSuccess: ReturnType<typeof getHandleSuccess>;
    downloadOps: IFileUploadEdmDownload;
}
interface IFileUploadBatchSegmentUpload {
    docId: string;
    batchIndex: number;
    batches: Promise<any>[][];
    progress: {
        file: IFileUploadFile;
    };
}
interface IFileUploadSegmentUploadInner {
    batchIndex: number;
    file: IFileUploadFile;
    progress: {
        file: IFileUploadFile;
    };
}
interface IFileUploadGetFormData {
    formData: IUploadFormData;
    file: IFileUploadFile;
    type: string;
}
interface IFileUploadSetWriterFile {
    data: any;
    index: number;
    isLessThan17G: boolean;
    file: IFileUploadFile;
}
interface IFileUploadAfterDownload extends IFileUploadDownloadFileSingle {
    data: any;
}
interface IFileUploadBatchSegmentDownload {
    batchIndex: number;
    batches: IFileUploadSliceDownloadChunk[][];
    docId: string;
    isBatch: boolean;
    isLessThan17G: boolean;
}
interface IFileUploadSliceDownloadChunk {
    startRange: number;
    endRange: number;
    index: number;
}
interface IFileUploadStreamsaver {
    createWriteStream: Function;
}

declare const uploadListProps: {
    disabled: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    display: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    files: {
        type: ArrayConstructor;
        default: () => never[];
    };
    filesIcon: {
        type: ArrayConstructor;
        default: () => never[];
    };
    handlePreview: FunctionConstructor;
    isEdm: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    isFolder: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    listType: StringConstructor;
    openDownloadFile: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    srcList: {
        type: ArrayConstructor;
        default: () => never[];
    };
    isFolderTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
    listOption: {
        type: ObjectConstructor;
        default: () => {
            showUpdate: boolean;
            showDel: boolean;
        };
    };
    maxNameLength: {
        type: NumberConstructor;
        default: number;
    };
    scale: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    showName: {
        type: BooleanConstructor;
        default: boolean;
    };
    types: ArrayConstructor;
    displayOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    handleDownloadFile: FunctionConstructor;
    handleReUpload: FunctionConstructor;
    isDragover: BooleanConstructor;
    selected: ObjectConstructor;
    triggerClick: {
        type: FunctionConstructor;
        default: () => void;
    };
    isHwh5: {
        type: BooleanConstructor;
        default: boolean;
    };
    triggerPlay: {
        type: FunctionConstructor;
        default: () => void;
    };
    mode: StringConstructor;
    lockScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    compact: {
        type: BooleanConstructor;
        default: boolean;
    };
    imageBgColor: StringConstructor;
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

/**
 * Copyright (c) 2022 - present TinyVue Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */

declare let getApi: () => {
    downloadFile: Function;
};

interface IUploadListState {
    focusing: boolean;
    shows: boolean;
    progressType: string;
    progressWidth: number;
    progressStrokeWidth: number;
    tooltipDisabled: boolean;
    closeComponent: string;
    preViewComponent: string;
    failUploadFileCount: number;
    startPostion: number;
    screenType: boolean;
    showPanel: boolean;
    showTriggerPanel: boolean;
    triggerClickType: string;
    showAudioPanel: boolean;
    files: object[];
    currentFile: null | IFileUploadFile;
}
interface IUploadListApi {
    state: IUploadListState;
    getApi: typeof getApi;
    getDeleteData: ReturnType<typeof getDeleteData>;
    parsePercentage: ReturnType<typeof parsePercentage>;
    downloadFile: ReturnType<typeof downloadFile>;
    picturefilePreview: ReturnType<typeof picturefilePreview>;
    handleClick: ReturnType<typeof handleClick$1>;
    play: ReturnType<typeof play>;
    pause: ReturnType<typeof pause>;
    handleLoadedmetadata: ReturnType<typeof handleLoadedmetadata>;
    handleTimeupdate: ReturnType<typeof handleTimeupdate>;
    destroyed: ReturnType<typeof destroyed>;
    showOperatePanel: ReturnType<typeof showOperatePanel>;
    getFileType: ReturnType<typeof getFileType>;
    getFileIcon: ReturnType<typeof getFileIcon>;
    mounted: ReturnType<typeof mounted$1>;
    calcUploadListLiWidth: ReturnType<typeof calcUploadListLiWidth>;
    reUpload: ReturnType<typeof reUpload>;
    remove: ReturnType<typeof remove>;
    handleTriggerClick: ReturnType<typeof handleTriggerClick>;
    chooseFile: ReturnType<typeof chooseFile>;
    calcVisible: ReturnType<typeof calcVisible>;
    getNotSuccessFiles: ReturnType<typeof getNotSuccessFiles>;
}
type IUploadListProps = ExtractPropTypes<typeof uploadListProps> & {
    files: {
        status: 'fail' | 'uploading' | 'success' | 'downloading';
    }[];
};
type IUploadListRenderlessParamUtils = ISharedRenderlessParamUtils<IFileUploadConstants>;
type IUploadListRenderlessParams = ISharedRenderlessFunctionParams<IFileUploadConstants> & {
    state: IUploadListState;
    props: IUploadListProps;
    api: IUploadListApi;
};
interface IUploadListVideoParam {
    type: 'ended';
    el: HTMLVideoElement;
}

export { IFileUploadGetFormData as A, IFileUploadSetWriterFile as B, IFileUploadAfterDownload as C, IFileUploadBatchSegmentDownload as D, IFileUploadSliceDownloadChunk as E, IFileUploadStreamsaver as F, IUploadListState as G, IUploadListApi as H, IFileUploadVm as I, IUploadListProps as J, IUploadListRenderlessParamUtils as K, IUploadListRenderlessParams as L, IUploadListVideoParam as M, IFileUploadConstants as a, IUploadStateHeader as b, IUploadState as c, IUploadApi as d, IUploadProps as e, IUploadRenderlessParamUtils as f, IUploadRenderlessParams as g, IUploadRenderlessOtherParams as h, IUploadFormData as i, IUploadOptionsOfPost as j, IUploadOptionsOfHwh5 as k, IFileUploadState as l, IFileUploadApi as m, IFileUploadService as n, IFileUploadProps as o, IFileUploadRenderlessParamUtils as p, IFileUploadRenderlessParams as q, IFileUploadModalVm as r, IFileUploadFile as s, IFileUploadEdmDownload as t, IFileUploadDownloadFileSingleInner as u, IFileUploadLargeDocumentDownload as v, IFileUploadDownloadFileInner as w, IFileUploadDownloadFileSingle as x, IFileUploadBatchSegmentUpload as y, IFileUploadSegmentUploadInner as z };
