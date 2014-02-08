Feature: As a user, I want to be able to create thoughts through the REST api

  Scenario: Lookup a thought

    Given A thought exists in the database
    When A "GET" on "/thought" is performed
    Then A thought is returned