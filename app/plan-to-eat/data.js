import {fetchUpcoming, fetchAll} from 'plantoeat';
import moment from 'moment';

export default class PlanToEatData {
    fetchPlan(id) {
        return fetchUpcoming(id)
            .then(function (events) {
                return events.map(function (event) {
                    return {
                        when: event.time,
                        what: event.content,
                        how: event.url
                    };
                });
            });
    }
}
