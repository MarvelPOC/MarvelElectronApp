import { vacancySearchConstants } from '../constants';
import { vacancySearchService } from '../service';

export const vacancySearchActions= {
    vacancySearch,
    clearProps,
};

function vacancySearch(props, searchCriteria){
    return dispatch => {
        dispatch(request(searchCriteria));      
        vacancySearchService.vacancySearchRequest(searchCriteria)
            .then(
                vacancyInfo => {
                    props.history.push('/vacancyResult');
                    dispatch(success(vacancyInfo))
                },
                error =>{
                    dispatch(failure(error))
                } 
            );
    };

    function request(searchCriteria) { return { type: vacancySearchConstants.VACANCY_SEARCH_REQUEST, payload: searchCriteria} }
    function success(vacancyInfo) { return { type: vacancySearchConstants.VACANCY_SEARCH_SUCCESS, payload: vacancyInfo } }
    function failure(error) { return { type: vacancySearchConstants.VACANCY_SEARCH__FAIL, error } }
}

function clearProps() {
    return { type: vacancySearchConstants.VACANCY_PROPS_CLEAR };
}