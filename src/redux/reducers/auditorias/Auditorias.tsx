// reducers/AuditoriasReducer.ts
import {
    FETCH_AUDITORIAS_TABLE_REQUEST,
    FETCH_AUDITORIAS_TABLE_SUCCESS,
    FETCH_AUDITORIAS_TABLE_FAILURE
} from '../../../constantes/admin/auditorias/Auditorias';

interface AuditoriasState {
    auditorias: any[];
    loading: boolean;
    error: string | null;
}

const initialState: AuditoriasState = {
    auditorias: [],
    loading: false,
    error: null,
};

const AuditoriasReducer = (state = initialState, action: any): AuditoriasState => {
    switch (action.type) {
        case FETCH_AUDITORIAS_TABLE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_AUDITORIAS_TABLE_SUCCESS:
            return {
                ...state,
                loading: false,
                auditorias: action.payload.auditorias,
            };
        case FETCH_AUDITORIAS_TABLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default AuditoriasReducer;
