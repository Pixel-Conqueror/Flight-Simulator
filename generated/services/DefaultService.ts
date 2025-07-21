/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Root
     * @returns any Successful Response
     * @throws ApiError
     */
    public static rootGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Health
     * @returns any Successful Response
     * @throws ApiError
     */
    public static healthHealthGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
        });
    }
    /**
     * Api State Liste
     * @param collection
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiStateListeApiStateListGet(
        collection: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/state_list',
            query: {
                'collection': collection,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Api Live State
     * @param icao24
     * @param page
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiLiveStateApiLiveStateGet(
        icao24?: (string | null),
        page: number = 1,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/live_state',
            query: {
                'icao24': icao24,
                'page': page,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Api Historical State
     * @param icao24
     * @param page
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiHistoricalStateApiHistoricalStateGet(
        icao24?: (string | null),
        page: number = 1,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/historical_state',
            query: {
                'icao24': icao24,
                'page': page,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Api Flights Meta
     * @param icao24
     * @param page
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiFlightsMetaApiFlightsMetaGet(
        icao24?: (string | null),
        page: number = 1,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/flights_meta',
            query: {
                'icao24': icao24,
                'page': page,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
