Feature: As a user, I want to be able to create thoughts through the REST api

  Scenario: Lookup a thought

    Given a thought exists in the database
    When a GET on /thought with "52ffef5e3242c4a82909c53f" is performed
    Then a thought is returned

  Scenario: Create a thought

    Given a user
    When a POST request on /thought is performed
    Then a thought is persisted

  Scenario: Update a thought

    Given a thought exists in the database
    When a PUT on /thought with "52ffef5e3242c4a82909c53f" is performed
    Then a thought is updated

