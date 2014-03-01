Feature: As a user, I want a user interface enable me to create and organize my thoughts

  Scenario: Create a thought

    Given a user
    When a POST request on /thought is performed
    Then a thought is persisted

